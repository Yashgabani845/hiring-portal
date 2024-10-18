from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import google.generativeai as palm
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load API key from .env file
load_dotenv()
palm_api_key = 'YOUR_API_KEY'  # Get your API key from environment variable
palm.configure(api_key=palm_api_key)

@app.route('/analyze', methods=['GET'])
def health_check():
    return jsonify({"message": "Server running!"}), 200

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        resume = request.files['resume']
        job_description = request.files['jobDescription']
        
        resume_text = extract_text_from_pdf(resume)
        job_description_text = extract_text_from_pdf(job_description)
        
        analysis_result = analyze_resume(resume_text, job_description_text)
        
        return jsonify({"analysis": analysis_result}), 200
    except Exception as e:
        print(e)  # Log the error for debugging
        return jsonify({"error h bhai dekh le": str(e)}), 500  # Return error message

def extract_text_from_pdf(file):
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in range(len(reader.pages)):
        text += reader.pages[page].extract_text()
    return text

def analyze_resume(resume_text, job_description):
    prompt = f"""
        Hey Act Like a skilled or very experience ATS(Application Tracking System)
        with a deep understanding of tech field,software engineering,data science ,data analyst
        and big data engineer. Your task is to evaluate the resume based on the given job description.
        You must consider the job market is very competitive and you should provide 
        best assistance for improving thr resumes. Assign the percentage Matching based 
        on Jd and
        the missing keywords with high accuracy
        resume:{resume_text}
        description:{job_description}

        I want the response in one single string having the structure
        {{"JD Match":"%","MissingKeywords:[]","Profile Summary":""}}
    """

    # Make sure to use the correct method from the library
    model=palm.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt);
    return response.text


if __name__ == "__main__":
    app.run(debug=True, port=8000)  # Ensure it's on port 8000
