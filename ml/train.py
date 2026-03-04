import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import pickle
import os

# Expanded Constants
EDUCATION_LEVELS = ['High School', 'Diploma', 'Bachelor', 'Master', 'PhD']
JOB_ROLES = [
    'Software Engineer', 'Data Scientist', 'Civil Engineer', 'Mechanical Engineer', 
    'Doctor', 'Surgeon', 'Nurse', 'Lawyer', 'Teacher', 'Professor', 
    'Accountant', 'Banker', 'Pilot', 'Architect', 'Chef', 
    'Journalist', 'HR Manager', 'Sales Executive', 'Marketing Manager', 
    'Scientist', 'Artist'
]
LOCATIONS = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 
    'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur', 
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 
    'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara'
]

# Base Monthly Salaries (estimates for training logic)
BASE_SALARIES = {
    'Software Engineer': 60000, 'Data Scientist': 75000, 'Civil Engineer': 45000, 
    'Mechanical Engineer': 48000, 'Doctor': 85000, 'Surgeon': 150000, 'Nurse': 35000, 
    'Lawyer': 55000, 'Teacher': 30000, 'Professor': 70000, 'Accountant': 40000, 
    'Banker': 50000, 'Pilot': 120000, 'Architect': 55000, 'Chef': 40000, 
    'Journalist': 35000, 'HR Manager': 55000, 'Sales Executive': 38000, 
    'Marketing Manager': 58000, 'Scientist': 65000, 'Artist': 30000
}

EDUCATION_MULTIPLIER = {
    'High School': 0.8, 'Diploma': 1.0, 'Bachelor': 1.2, 'Master': 1.5, 'PhD': 2.0
}

# Regional Multipliers (higher for Tier 1 cities)
LOCATION_MULTIPLIER = {
    'Mumbai': 1.3, 'Delhi': 1.25, 'Bengaluru': 1.35, 'Hyderabad': 1.2, 
    'Chennai': 1.15, 'Pune': 1.2, 'Ahmedabad': 1.05, 'Kolkata': 1.1,
    'Surat': 1.0, 'Jaipur': 0.95, 'Lucknow': 0.9, 'Kanpur': 0.85, 
    'Nagpur': 0.9, 'Indore': 0.9, 'Thane': 1.2, 'Bhopal': 0.85, 
    'Visakhapatnam': 0.95, 'Pimpri-Chinchwad': 1.15, 'Patna': 0.8, 'Vadodara': 0.95
}

def generate_data(n_samples=2500):
    np.random.seed(42)
    data = []
    
    for _ in range(n_samples):
        age = np.random.randint(22, 60)
        exp = age - np.random.randint(21, 26)
        exp = max(0, exp)
        
        role = np.random.choice(JOB_ROLES)
        edu = np.random.choice(EDUCATION_LEVELS)
        loc = np.random.choice(LOCATIONS)
        
        # Base logic
        base = BASE_SALARIES.get(role, 40000)
        edu_mult = EDUCATION_MULTIPLIER.get(edu, 1.0)
        loc_mult = LOCATION_MULTIPLIER.get(loc, 1.0)
        
        # Salary = (base * edu * loc) + (exp * 6000) + random noise
        salary = (base * edu_mult * loc_mult) + (exp * 6000)
        salary += np.random.normal(0, base * 0.1) # 10% variance
        
        data.append([age, exp, edu, role, loc, max(15000, round(salary))])

    return pd.DataFrame(data, columns=['age', 'experience', 'education', 'job_role', 'location', 'salary'])

def train_model():
    print(f"Generating expanded dataset with {len(JOB_ROLES)} roles across {len(LOCATIONS)} cities...")
    df = generate_data()
    
    os.makedirs('ml', exist_ok=True)
    df.to_csv('ml/salary_data_expanded.csv', index=False)
    
    # Encoders
    le_edu = LabelEncoder().fit(EDUCATION_LEVELS)
    le_role = LabelEncoder().fit(JOB_ROLES)
    le_loc = LabelEncoder().fit(LOCATIONS)
    
    df['education'] = le_edu.transform(df['education'])
    df['job_role'] = le_role.transform(df['job_role'])
    df['location'] = le_loc.transform(df['location'])
    
    X = df.drop('salary', axis=1)
    y = df['salary']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, random_state=42)
    
    print("Training Random Forest Regressor on expanded scope...")
    model = RandomForestRegressor(n_estimators=150, random_state=42)
    model.fit(X_train, y_train)
    
    # Save model and encoders
    model_data = {
        'model': model,
        'le_edu': le_edu,
        'le_role': le_role,
        'le_loc': le_loc
    }
    
    with open('ml/model.pkl', 'wb') as f:
        pickle.dump(model_data, f)
    
    print("Success! Model saved to ml/model.pkl")

if __name__ == "__main__":
    train_model()
