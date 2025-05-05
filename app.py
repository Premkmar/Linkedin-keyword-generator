from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Dummy AI model function - replace this with your Granite model inference
def run_local_ai_model(data):
    # Example: generate a simple summary string based on input data
    full_name = data.get("full_name", "Unknown")
    skills = data.get("skills", "No skills provided")
    headline = data.get("headline", "")
    summary = f"{full_name} is a professional skilled in {skills}. Headline: {headline}"
    return summary

# Home page with form
@app.route('/')
def home():
    return '''
    <h1>AI Profile Generator</h1>
    <form action="/submit-form" method="post">
        Full Name: <input type="text" name="fullName"><br>
        Skills: <input type="text" name="skills"><br>
        Headline: <input type="text" name="headline"><br>
        <input type="submit" value="Generate">
    </form>
    '''

# Local AI API endpoint
@app.route('/api/generate', methods=['POST'])
def api_generate():
    try:
        data = request.get_json()
        ai_response = run_local_ai_model(data)
        return jsonify({"output": ai_response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Form submission handler that calls local AI API
@app.route('/submit-form', methods=['POST'])
def submit_form():
    # Collect form data
    full_name = request.form.get('fullName')
    skills = request.form.get('skills')
    headline = request.form.get('headline')

    payload = {
        "full_name": full_name,
        "skills": skills,
        "headline": headline
    }

    import requests
    try:
        # Call the local AI API endpoint
        response = requests.post('http://localhost:5000/api/generate', json=payload)
        if response.status_code == 200:
            ai_output = response.json().get('output')
        else:
            ai_output = f"API Error: {response.status_code} - {response.text}"
    except Exception as e:
        ai_output = f"Request failed: {str(e)}"

    # Display the AI output
    return f'''
    <h1>Generated Profile Summary</h1>
    <p>{ai_output}</p>
    <a href="/">Go Back</a>
    '''

if __name__ == '__main__':
    app.run(debug=True)
