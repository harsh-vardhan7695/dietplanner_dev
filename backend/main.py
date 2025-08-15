import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import List, Optional
import uvicorn

# Import CrewAI components
from crewai import Agent, Task, Crew, LLM
from crewai_tools import SerperDevTool
from langchain_openai import ChatOpenAI
from langchain_deepseek import ChatDeepSeek
# Load environment variables
load_dotenv()

# Initialize the app
app = FastAPI(title="DietPlan API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    # Allow all origins temporarily for debugging
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept"],
)

# Initialize the search tool
search_tool = SerperDevTool()

class UserInfo(BaseModel):
    age: str
    gender: str
    height: str
    weight: str
    activity_level: str
    goals: str
    medical_conditions: str
    medications: str
    allergies: str
    food_preferences: str
    cooking_ability: str
    budget: str
    cultural_factors: str

class PlanRequest(BaseModel):
    user_id: str
    goal: str
    dietary_restrictions: str
    allergies: str
    additional_notes: str
    user_info: Optional[UserInfo] = None

def get_llm():
    """Initialize the language model."""
    # api_key = os.getenv("OPENAI_API_KEY")
    deepseek_api_key = os.getenv("DEEPSEEK_API_KEY")
    # if not api_key:
    #     raise HTTPException(status_code=500, detail="OpenAI API key not found")
    if not deepseek_api_key:
        raise HTTPException(status_code=500, detail="DeepSeek API key not found")
    
    # return LLM(
    #     model="openai/o1-mini",
    #     api_key=api_key,
    #     verbose=True
    # )
    
    # Use LLM integration with deepseek-coder model
    return LLM(
        model="deepseek/deepseek-coder",
        api_key=deepseek_api_key,
        verbose=True
    )

def create_agents():
    """Create the specialized nutrition agents."""
    llm = get_llm()
    
    # Nutrition Researcher
    nutritionist = Agent(
        role='Nutrition Specialist',
        goal='Develop personalized nutritional recommendations based on evidence',
        backstory='''Expert nutritionist specializing in therapeutic diets and evidence-based recommendations.''',
        tools=[search_tool],
        llm=llm,
        verbose=True
    )
    
    # Medical Nutrition Specialist
    medical_specialist = Agent(
        role='Medical Nutrition Therapist',
        goal='Analyze medical conditions and provide dietary modifications',
        backstory='''Specialist in nutrition-related aspects of medical conditions and medication-food interactions.''',
        tools=[search_tool],
        llm=llm,
        verbose=True
    )
    
    # Diet Plan Creator
    diet_planner = Agent(
        role='Therapeutic Diet Planner',
        goal='Create practical meal plans tailored to individual needs',
        backstory='''Expert at creating delicious, practical meal plans that optimize health and enjoyment.''',
        llm=llm,
        verbose=True
    )
    
    return nutritionist, medical_specialist, diet_planner

def create_tasks(nutritionist, medical_specialist, diet_planner, user_info):
    """Create tasks for each agent based on user information."""
    
    # First task: Research nutrition needs based on demographics
    demographics_research = Task(
        description=f'''Research nutritional needs for: Age: {user_info.age}, Gender: {user_info.gender}, 
            Height: {user_info.height}, Weight: {user_info.weight}, Activity: {user_info.activity_level}, 
            Goals: {user_info.goals}. 
            Provide: 1) Caloric needs, 2) Macronutrient distribution, 3) Key micronutrients, 
            4) Hydration requirements, 5) Meal timing recommendations.''',
        agent=nutritionist,
        expected_output="Nutritional profile with scientific rationale"
    )
    
    # Second task: Analyze medical conditions and adjust nutritional recommendations
    medical_analysis = Task(
        description=f'''Analyze Medical Information: 
            - Medical Conditions: {user_info.medical_conditions}
            - Medications: {user_info.medications} 
            - Medical Allergies/Intolerances: {user_info.allergies}
            
            IMPORTANT: Treat allergies as STRICT medical restrictions - completely EXCLUDE these foods.
            
            Provide: 1) Nutrients to adjust based on conditions, 2) Food-medication interactions, 
            3) Potential deficiencies, 4) Beneficial foods, 5) Foods to completely AVOID due to medical reasons.''',
        agent=medical_specialist,
        context=[demographics_research],
        expected_output="Medical nutrition therapy adjustments with strict allergy exclusions"
    )
    
    # Third task: Create the comprehensive diet plan
    diet_plan = Task(
        description=f'''Create a comprehensive diet plan with these requirements:
            
            DIETARY PREFERENCES & RESTRICTIONS: {user_info.food_preferences}
            COOKING ABILITY: {user_info.cooking_ability}
            BUDGET: {user_info.budget}
            CULTURAL FACTORS: {user_info.cultural_factors}
            
            CRITICAL REQUIREMENTS:
            1. STRICTLY FOLLOW all dietary preferences and restrictions mentioned above
            2. If "vegetarian", "vegan", "no non-veg", "no meat" is mentioned - EXCLUDE ALL animal products
            3. If specific foods are mentioned to avoid - COMPLETELY EXCLUDE them
            4. Respect cultural and religious dietary laws
            5. Stay within the specified budget range
            6. Match the cooking complexity to user's ability
            
            Include: 1) Daily/weekly foods with portions, 2) 7-day meal plan with recipes, 
            3) Grocery list, 4) Meal prep tips, 5) Eating out guidelines, 
            6) Supplement recommendations if needed, 7) Hydration plan.
            
            DOUBLE-CHECK: Ensure no foods violate the dietary preferences/restrictions.''',
        agent=diet_planner,
        context=[demographics_research, medical_analysis],
        expected_output="Personalized nutrition plan strictly following dietary preferences"
    )
    
    return [demographics_research, medical_analysis, diet_plan]

def create_crew(agents, tasks):
    """Create the CrewAI crew with the specified agents and tasks."""
    return Crew(
        agents=agents,
        tasks=tasks,
        verbose=True
    )

def extract_user_info(plan_data):
    """Extract user information from the plan data or create default values."""
    # If user_info is provided, use it
    if plan_data.user_info:
        return plan_data.user_info
    
    # Otherwise, create a default UserInfo with minimal data from the plan
    return UserInfo(
        age="30-40",
        gender="Not specified",
        height="Average",
        weight="Not specified",
        activity_level="Moderate",
        goals=plan_data.goal,
        medical_conditions="None specified",
        medications="None specified",
        allergies=plan_data.allergies or "None specified",
        food_preferences=plan_data.dietary_restrictions or "No specific preferences",
        cooking_ability="Intermediate",
        budget="Medium",
        cultural_factors="Not specified"
    )

@app.post("/api/generate-plan")
async def generate_plan(plan_data: PlanRequest):
    """Generate a personalized nutrition plan using CrewAI."""
    try:
        # Extract user information
        user_info = extract_user_info(plan_data)
        
        # Create agents
        nutritionist, medical_specialist, diet_planner = create_agents()
        
        # Create tasks
        tasks = create_tasks(nutritionist, medical_specialist, diet_planner, user_info)
        
        # Create crew
        crew = create_crew([nutritionist, medical_specialist, diet_planner], tasks)
        
        # Execute the crew
        result = crew.kickoff()
        
        return {"plan": result, "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    """API health check endpoint."""
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 