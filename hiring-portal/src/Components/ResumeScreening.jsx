import React, { useState, useRef, useEffect } from 'react';
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const ResumeScreening = () => {
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const API_KEY = 'AIzaSyCoa5aobbOEwt9Jsu01s7KBDPKd4Xgow6c';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const formatResponse = (text) => {
    // Split the response into sections based on common patterns
    const sections = text.split(/(?=Skills:|Experience:|Education:|Summary:|Projects:|Languages:|Certifications:|Contact:)/g);
    
    return sections.map((section, index) => {
      const [title, ...content] = section.trim().split('\n');
      
      if (!title) return null;

      return (
        <div key={index} style={styles.responseSection}>
          <h3 style={styles.sectionTitle}>{title.trim()}</h3>
          {content.map((line, i) => (
            <p key={i} style={styles.sectionContent}>
              {line.trim().startsWith('-') ? (
                <span style={styles.bulletPoint}>{line.trim()}</span>
              ) : (
                line.trim()
              )}
            </p>
          ))}
        </div>
      );
    });
  };

  const handleTextChange = (event) => {
    setResumeText(event.target.value);
  };

  const analyzeResume = async () => {
    if (!resumeText.trim()) return;
    
    setLoading(true);
    setError(null);

    const userMessage = {
      type: 'user',
      content: resumeText,
      timestamp: new Date().toLocaleTimeString()
    };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      const payload = {
        contents: [{
          parts: [{ text: `Analyze this resume and provide a detailed breakdown including Skills, Experience, Education, and any other relevant sections. Format the response clearly with section headings and bullet points where appropriate: ${resumeText}` }]
        }]
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || 'Failed to analyze resume'}`);
      }

      const data = await response.json();
      const extractedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No content available';

      const aiMessage = {
        type: 'ai',
        content: extractedText,
        timestamp: new Date().toLocaleTimeString(),
        formatted: true
      };
      setChatHistory(prev => [...prev, aiMessage]);
      setResumeText('');

    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || 'Failed to analyze resume. Please try again.');
      
      const errorMessage = {
        type: 'error',
        content: err.message || 'Failed to analyze resume. Please try again.',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      analyzeResume();
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '1rem',
      backgroundColor: '#f5f5f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    card: {
      width: '100%',
      maxWidth: '800px',
      height: '90vh',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    header: {
      backgroundColor: '#2563eb',
      padding: '1rem',
      borderTopLeftRadius: '12px',
      borderTopRightRadius: '12px',
      color: 'white',
    },
    headerTitle: {
      margin: '0',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      '@media (max-width: 600px)': {
        fontSize: '1rem',
      },
    },
    headerSubtitle: {
      margin: '0.5rem 0 0',
      fontSize: '0.875rem',
      opacity: '0.8',
    },
    chatContainer: {
      flex: 1,
      padding: '1rem',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    messageContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      maxWidth: '100%',
    },
    message: {
      maxWidth: '85%',
      padding: '1rem',
      borderRadius: '12px',
      fontSize: '0.875rem',
      lineHeight: '1.5',
      '@media (max-width: 600px)': {
        maxWidth: '90%',
        padding: '0.75rem',
      },
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#2563eb',
      color: 'white',
    },
    aiMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#f3f4f6',
      color: '#1f2937',
      width: '100%',
    },
    errorMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#fee2e2',
      color: '#dc2626',
    },
    responseSection: {
      marginBottom: '1rem',
      padding: '0.5rem 0',
      borderBottom: '1px solid #e5e7eb',
    },
    sectionTitle: {
      margin: '0 0 0.5rem 0',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#2563eb',
    },
    sectionContent: {
      margin: '0.25rem 0',
      fontSize: '0.875rem',
      lineHeight: '1.5',
    },
    bulletPoint: {
      display: 'block',
      paddingLeft: '1rem',
    },
    timestamp: {
      fontSize: '0.75rem',
      opacity: '0.7',
      marginTop: '0.25rem',
    },
    inputContainer: {
      padding: '1rem',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      gap: '0.5rem',
      backgroundColor: 'white',
    },
    textarea: {
      flex: 1,
      padding: '0.75rem',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      resize: 'none',
      height: '80px',
      fontSize: '0.875rem',
      outline: 'none',
      '@media (max-width: 600px)': {
        height: '60px',
      },
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s',
      '@media (max-width: 600px)': {
        padding: '0.5rem 1rem',
      },
    },
    disabledButton: {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
    error: {
      color: '#dc2626',
      fontSize: '0.875rem',
      marginTop: '0.5rem',
      padding: '0 1rem',
    },
    loadingSpinner: {
      width: '20px',
      height: '20px',
      border: '2px solid #ffffff',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  };

  return (
  <>
  <Navbar/>
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>AI Resume Screening</h2>
          <p style={styles.headerSubtitle}>Paste your resume text for instant analysis</p>
        </div>
        
        <div style={styles.chatContainer}>
          {chatHistory.map((message, index) => (
            <div key={index} style={styles.messageContainer}>
              <div style={{
                ...styles.message,
                ...(message.type === 'user' ? styles.userMessage :
                   message.type === 'error' ? styles.errorMessage :
                   styles.aiMessage)
              }}>
                {message.type === 'ai' ? (
                  formatResponse(message.content)
                ) : (
                  <div>{message.content}</div>
                )}
                <div style={styles.timestamp}>{message.timestamp}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={styles.inputContainer}>
          <textarea
            style={styles.textarea}
            placeholder="Paste your resume text here..."
            value={resumeText}
            onChange={handleTextChange}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={analyzeResume}
            disabled={loading || !resumeText.trim()}
            style={{
              ...styles.button,
              ...(loading || !resumeText.trim() ? styles.disabledButton : {})
            }}
          >
            {loading ? (
              <div style={styles.loadingSpinner} />
            ) : (
              'Send'
            )}
          </button>
        </div>
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ResumeScreening;