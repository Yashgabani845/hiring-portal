import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import '../CSS/chatbot.css'; // Import the CSS file

const steps = [
    {
        id: '0',
        message: 'Welcome to our hiring portal! How can I assist you today?',
        trigger: 'options',
    },
    {
        id: 'options',
        options: [
            { value: 'jobs', label: 'View Job Openings', trigger: 'job-openings' },
            { value: 'apply', label: 'How to Apply', trigger: 'application-process' },
            { value: 'status', label: 'Check Application Status', trigger: 'check-status' },
            { value: 'contact', label: 'Contact HR', trigger: 'contact-hr' },
        ],
    },
    {
        id: 'job-openings',
        component: (
            <p>
                Click the link to see
                <a href="http://localhost:3000/jobcard" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', marginLeft: '10px' }}>
                    current job openings
                </a>
            </p>
        ),
        trigger: 'ask-another',
    },
    {
        id: 'software-details',
        message: 'Here are the details for the Software Engineer position',
        trigger: 'apply-prompt',
    },
    {
        id: 'apply-prompt',
        message: 'Would you like to apply?',
        trigger: 'apply-options',
    },
    {
        id: 'apply-options',
        options: [
            { value: 'yes', label: 'Yes', trigger: 'application-process' },
            { value: 'no', label: 'No', trigger: 'options' },
        ],
    },
    {
        id: 'application-process',
        message: 'To apply, follow these steps:',
        trigger: 'application-steps',
    },
    {
        id: 'application-steps',
        component: (
            <div>
                <ol>
                    <li> Go to the current <a href="http://localhost:3000/jobcard" style={{ textDecoration: 'underline' }}> job openings page.</a></li>
                    <li> Find a suitable job that matches your skills.</li>
                    <li> Click on "Apply" next to the job you're interested in.</li>
                    <li> Fill in your details in the application form.</li>
                    <li> Submit your application.</li>
                </ol>
            </div>
        ),
        trigger: 'ask-another',
    },
    {
        id: 'ask-another',
        message: 'Is there anything else I can help you with?',
        trigger: 'options',
    },
    {
        id: 'check-status',
        message: 'Here is the status...',
        end: true,
    },
    {
        id: 'contact-hr',
        message: 'You can contact HR at hr@example.com or call 123-456-7890.',
        trigger: 'ask-another',
    },
];

const Chatbot = () => {
    const [showChatbot, setshowChatbot] = useState(false)

    const customStyles = {
        botBubbleStyle: {
            backgroundColor: '#4a90e2',
            color: 'white',
            padding: '10px',
            borderRadius: '20px',
            maxWidth: '75%',
            margin: '5px 0',
        },
        userBubbleStyle: {
            backgroundColor: '#f0f0f0',
            color: 'black',
            padding: '10px',
            borderRadius: '20px',
            maxWidth: '75%',
            margin: '5px 0',
            alignSelf: 'flex-end',
        },
        bubbleStyle: {
            borderRadius: '10px',
        },
        headerStyle: {
            backgroundColor: '#4a90e2',
            color: 'white',
            fontSize: '1.5em',
            padding: '10px',
            textAlign: 'center',
        },
        botAvatarStyle: {
            backgroundColor: '#4a90e2',
        },
        userAvatarStyle: {
            backgroundColor: '#ccc',
        },
    };
    const closeChatbot = () => {
        setshowChatbot(false);
    };

    const openChatbot = () => {
        setshowChatbot(true);
    };

    return (
        <>
            <button onClick={openChatbot} className={`chatbot-button ${showChatbot ? 'hideChatBot' : 'showChatBot'}`}>
                <i className="fa fa-commenting" aria-hidden="true"></i> Chat
            </button>
            <div className={`chatbot-container ${showChatbot ? 'showChatBot' : 'hideChatBot'}`}>

                <div className='chatbot-header'>
                    <div className="header">Hiring Portal</div>
                    <div id='close-chatbot' onClick={closeChatbot}>X</div>
                </div>
                <ChatBot steps={steps} className="chatbot"
                    bubbleStyle={customStyles.bubbleStyle}
                    botBubbleStyle={customStyles.botBubbleStyle}
                    userBubbleStyle={customStyles.userBubbleStyle}
                    headerStyle={customStyles.headerStyle}
                    botAvatarStyle={customStyles.botAvatarStyle}
                    userAvatarStyle={customStyles.userAvatarStyle} />
            </div>
        </>
    );
};

export default Chatbot;
