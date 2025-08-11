from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

@app.route('/api/generate-plan', methods=['POST'])
def generate_plan():
    # Get the data from the request
    data = request.json
    
    print("Received plan request with data:", data)
    
    # For now, just send back the sample data
    return jsonify({
        "plan": """
# Personalized Nutrition Plan

## Nutritional Requirements  
- **Calories**: 2,100 calories
- **Protein**: 120-150g
- **Carbohydrates**: 210-260g
- **Fats**: 58-70g
- **Water**: 3+ liters daily
- **Vitamin D3**: 1000-2000 IU daily
- **Magnesium**: 300mg daily
- **Omega-3**: 1000mg daily

## Medical Considerations
- Limited Sodium: Keep below 2,000mg daily
- Increased Potassium: Aim for 3,500-4,700mg daily
- Moderate Glycemic Index: Focus on low GI carbohydrates
- Avoid: Processed foods with artificial preservatives

## 7-Day Meal Plan

### Day 1

**Breakfast**:
- Overnight oats with almond milk, berries, and 1 tbsp flaxseeds
- 1 medium apple
- Green tea (unsweetened)

**Lunch**:
- Grilled chicken salad with mixed greens, cherry tomatoes, cucumber, and olive oil dressing
- 1/2 cup brown rice
- 8oz water with lemon

**Dinner**:
- Baked salmon (4oz) with dill and lemon
- Steamed broccoli and carrots
- Small sweet potato
- Sparkling water

**Snack**:
- Greek yogurt with honey and walnuts
- Herbal tea

### Day 2

**Breakfast**:
- Vegetable omelet (2 eggs, spinach, tomatoes, mushrooms)
- 1 slice whole grain toast
- 1/2 avocado
- Black coffee (if desired)

**Lunch**:
- Quinoa bowl with roasted vegetables and grilled tofu
- Mixed green side salad
- Water with cucumber slices

**Dinner**:
- Baked chicken breast with herbs
- Roasted brussels sprouts
- Sweet potato mash
- Herbal tea

**Snack**:
- Apple slices with almond butter
- Sparkling water

## Grocery List

### Proteins:
- Chicken breast (organic if possible)
- Wild-caught salmon
- Ground turkey (lean)
- Tofu (firm)
- Greek yogurt 
- Eggs

### Vegetables:
- Spinach
- Broccoli
- Zucchini
- Carrots
- Mixed greens
- Cherry tomatoes
- Cucumber
- Bell peppers
- Mushrooms

### Fruits:
- Apples
- Berries (mixed)
- Lemons
- Avocados
- Bananas

### Grains & Starches:
- Brown rice
- Quinoa
- Sweet potatoes
- Whole grain bread
- Oats (steel-cut or rolled)""",
        "status": "success"
    })

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8001, debug=True) 