# DietPlanner - AI-Powered Personalized Nutrition Planning

A full-stack application that generates personalized nutrition plans using CrewAI agents and advanced language models.

## 🚀 Features

- **AI-Powered Nutrition Plans**: Uses CrewAI with specialized nutrition agents
- **Personalized Recommendations**: Based on user health data, preferences, and goals
- **Modern Frontend**: Built with React, TypeScript, and Tailwind CSS
- **Robust Backend**: FastAPI with CrewAI integration
- **Fallback System**: Intelligent fallbacks when AI services are unavailable

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: FastAPI + CrewAI + LangChain
- **AI Models**: OpenAI GPT, DeepSeek, with Serper for web search
- **Database**: Supabase integration ready

## 📋 Prerequisites

- Node.js (v16 or higher)
- Python 3.11+
- Git

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/harsh-vardhan7695/dietplanner_dev.git
cd dietplanner_dev
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Environment Configuration

#### Frontend Environment
Create `.env` in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8000
```

#### Backend Environment
Create `.env` in the `backend/` directory:
```env
# API Keys - Get these from respective providers
OPENAI_API_KEY=your_openai_api_key_here
SERPER_API_KEY=your_serper_api_key_here
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# Server settings
PORT=8000
HOST=0.0.0.0
```

## 🚀 Running the Application

### Option 1: Using Startup Scripts (Recommended)

```bash
# Start both frontend and backend
./start-app.sh

# Stop all servers
./stop-app.sh
```

### Option 2: Manual Startup

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python3 main.py
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 🌐 Access URLs

- **Frontend**: http://localhost:8080 (or next available port)
- **Backend API**: http://localhost:8000
- **API Health Check**: http://localhost:8000/api/health

## 🔑 API Keys Setup

### OpenAI API Key
1. Visit [OpenAI API](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add to your backend `.env` file

### Serper API Key
1. Visit [Serper.dev](https://serper.dev/)
2. Sign up and get your API key
3. Add to your backend `.env` file

### DeepSeek API Key
1. Visit [DeepSeek](https://platform.deepseek.com/)
2. Create an account and get your API key
3. Add to your backend `.env` file

## 📖 API Documentation

### Generate Nutrition Plan
```
POST /api/generate-plan
Content-Type: application/json

{
  "user_id": "string",
  "goal": "weight_loss|muscle_gain|maintenance",
  "dietary_restrictions": "string",
  "allergies": "string",
  "additional_notes": "string",
  "user_info": {
    "age": "string",
    "gender": "string",
    "height": "string",
    "weight": "string",
    "activity_level": "string",
    "goals": "string",
    "medical_conditions": "string",
    "medications": "string",
    "allergies": "string",
    "food_preferences": "string",
    "cooking_ability": "string",
    "budget": "string",
    "cultural_factors": "string"
  }
}
```

### Health Check
```
GET /api/health
```

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:8000/api/health

# Test plan generation
curl -X POST http://localhost:8000/api/generate-plan \
  -H "Content-Type: application/json" \
  -d '{"user_id":"test","goal":"weight_loss","dietary_restrictions":"","allergies":"","additional_notes":""}'
```

## 🤖 CrewAI Agents

The application uses three specialized AI agents:

1. **Nutrition Specialist**: Analyzes caloric needs and macronutrient requirements
2. **Medical Nutrition Therapist**: Handles medical conditions and medication interactions
3. **Therapeutic Diet Planner**: Creates practical meal plans and recipes

## 🔧 Troubleshooting

### Common Issues

1. **Port conflicts**: The frontend will automatically find available ports (8080, 8081, 8082)
2. **Backend not starting**: Ensure you're in the `backend/` directory and virtual environment is activated
3. **API errors**: Check that all API keys are correctly set in the backend `.env` file

### Logs

- Backend logs are displayed in the terminal where you run `python3 main.py`
- Frontend logs are in the browser console

## 📁 Project Structure

```
dietplanner_dev/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main application file
│   ├── requirements.txt    # Python dependencies
│   ├── .env.example       # Environment template
│   └── venv/              # Virtual environment
├── src/                    # React frontend source
│   ├── components/        # React components
│   ├── pages/            # Page components
│   └── integrations/     # API integration
├── public/               # Static assets
├── start-app.sh         # Startup script
├── stop-app.sh          # Stop script
├── .env.example         # Frontend environment template
└── README.md           # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- CrewAI for the multi-agent framework
- OpenAI for language models
- FastAPI for the backend framework
- React and Vite for the frontend
