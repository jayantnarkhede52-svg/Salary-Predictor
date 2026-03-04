import pickle
import sys
import json
import os

def predict():
    # Load model and encoders
    model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
    
    if not os.path.exists(model_path):
        print(json.dumps({"error": "Model not found. Please train the model first."}))
        return

    with open(model_path, 'rb') as f:
        model_data = pickle.load(f)
    
    model = model_data['model']
    le_edu = model_data['le_edu']
    le_role = model_data['le_role']
    le_loc = model_data['le_loc']

    # Get input from command line arguments
    try:
        if len(sys.argv) > 1:
            input_json = sys.argv[1]
            data = json.loads(input_json)
        else:
            print(json.dumps({"error": "No input data provided."}))
            return

        age = int(data['age'])
        experience = int(data['experience'])
        education = data['education']
        job_role = data['job_role']
        location = data['location']
        # Note: Skills are currently not used in the regression for simplicity, but can be added
        
        # Transform inputs
        edu_encoded = le_edu.transform([education])[0]
        role_encoded = le_role.transform([job_role])[0]
        loc_encoded = le_loc.transform([location])[0]
        
        prediction = model.predict([[age, experience, edu_encoded, role_encoded, loc_encoded]])
        
        print(json.dumps({"salary": round(prediction[0], 2)}))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    predict()
