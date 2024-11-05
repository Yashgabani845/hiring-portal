from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import google.generativeai as palm
import os
from dotenv import load_dotenv
import hashlib

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load API key from .env file
load_dotenv()
palm_api_key = os.getenv('PALM_API_KEY')  # Get your API key from environment variable
if not palm_api_key:
    raise ValueError("API key is missing. Please set your API key in the environment variables.")
palm.configure(api_key=palm_api_key)

# Simple in-memory cache
cache = {}

# Function to generate a unique cache key
def generate_cache_key(resume_text, job_description_text):
    """Generate a unique key using a hash of the resume and job description content."""
    return hashlib.sha256((resume_text + job_description_text).encode('utf-8')).hexdigest()

# Return only the first 1000 characters for preview purposes
@app.route('/preview', methods=['POST'])
def preview_text():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "PDF file is required."}), 400

        file = request.files['file']
        if not file.filename.endswith('.pdf'):
            return jsonify({"error": "File must be in PDF format."}), 400
            
        text = extract_text_from_pdf(file)
        return jsonify({"text": text[:1000]}), 200

    except PyPDF2.errors.PdfReadError:
        return jsonify({"error": "Error reading the PDF file. Please ensure it is valid."}), 400
    except Exception as e:
        print("Unexpected Error:", str(e))  
        return jsonify({"error": "An unexpected error occurred while processing the PDF."}), 500

@app.route('/analyze', methods=['GET'])
def health_check():
    return jsonify({"message": "Server running!"}), 200

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        if 'resume' not in request.files or 'jobDescription' not in request.files:
            return jsonify({"error": "Both resume and job description files are required."}), 400

        resume = request.files['resume']
        job_description = request.files['jobDescription']

        # File format validation
        if not (resume.filename.endswith('.pdf') and job_description.filename.endswith('.pdf')):
            return jsonify({"error": "Both files must be in PDF format."}), 400

        # Text extraction
        resume_text = extract_text_from_pdf(resume)
        job_description_text = extract_text_from_pdf(job_description)

        # Generate cache key and check cache
        cache_key = generate_cache_key(resume_text, job_description_text)
        if cache_key in cache:
            print("Returning cached result")
            return jsonify({"analysis": cache[cache_key]}), 200

        # Perform analysis if not cached
        analysis_result = analyze_resume(resume_text, job_description_text)

        # Store result in cache
        cache[cache_key] = analysis_result

        return jsonify({"analysis": analysis_result}), 200
    except PyPDF2.errors.PdfReadError:
        return jsonify({"error": "Error reading one of the PDF files. Please ensure the files are valid PDFs."}), 400
    except Exception as e:
        print(e)  # Log the error for debugging
        return jsonify({"error": "An unexpected error occurred. Please try again later."}), 500  # Generic error message

def extract_text_from_pdf(file):
    try:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in range(len(reader.pages)):
            text += reader.pages[page].extract_text()
        return text
    except Exception:
        raise PyPDF2.errors.PdfReadError("Failed to extract text from PDF.")

def analyze_resume(resume_text, job_description):
    prompt = f"""
        Hey Act Like a skilled or very experienced ATS(Application Tracking System)
        with a deep understanding of tech field, software engineering, data science, data analyst
        and big data engineering. Your task is to evaluate the resume based on the given job description.
        You must consider the job market is very competitive and you should provide 
        the best assistance for improving the resumes. Assign the percentage Matching based 
        on JD and
        the missing keywords with high accuracy
        resume:{resume_text}
        description:{job_description}

        I want the response in one single string having the structure
        {{"JD Match":"%","MissingKeywords:[]","Profile Summary":""}}
    """

    # Make sure to use the correct method from the library
    model = palm.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text

if __name__ == "__main__":
    app.run(debug=True, port=8000)  # Ensure it's on port 8000
