from flask import Flask, render_template, request, redirect, url_for
import requests  # for sending request to AI API

app = Flask(__name__)

# 🔑 API KEY placeholder
API_KEY = "YOUR_API_KEY_HERE"  # ← Replace this with your actual API Key
API_URL = "https://api.your-llm-provider.com/generate"  # ← Replace with your API endpoint

@app.route('/')
def home():
    return render_template('Home.html')

@app.route('/submit-form', methods=['POST'])
def submit_form():
    # Collect form data
    full_name = request.form.get('fullName')
    job_title = request.form.get('jobTitle')
    industry = request.form.get('industry')
    skills = request.form.get('skills')
    experience = request.form.get('experience')
    achievements = request.form.get('achievements')
    headline = request.form.get('headline')
    motto = request.form.get('motto')
    
    # Collect work experience fields (optional: handle multiple entries)
    company_1 = request.form.get('company-1')
    designation_1 = request.form.get('designation-1')
    experience_1 = request.form.get('experience-1')

    # Prepare the payload for API call
    payload = {
        "full_name": full_name,
        "job_title": job_title,
        "industry": industry,
        "skills": skills,
        "experience": experience,
        "achievements": achievements,
        "headline": headline,
        "motto": motto,
        "work_experience": [
            {
                "company": company_1,
                "designation": designation_1,
                "years": experience_1
            }
        ]
    }

    # Prepare headers (include API key)
    headers = {
        "Authorization": f"Bearer {API_KEY}",  # 👈 include API key in header
        "Content-Type": "application/json"
    }

    try:
        # Call the external AI API
        response = requests.post(API_URL, json=payload, headers=headers)

        # Check response
        if response.status_code == 200:
            ai_output = response.json().get('output')  # assuming API returns {'output': 'text'}
        else:
            ai_output = f"API Error: {response.status_code} - {response.text}"

    except Exception as e:
        ai_output = f"Request failed: {str(e)}"

    # Render result template
    return render_template('result.html', result=ai_output)

if __name__ == '__main__':
    app.run(debug=True)
