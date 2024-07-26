'use client';
import React, { useState, useEffect } from 'react';
import {chatDoppel, generateDoppels} from '@/lib/gemini';

// Note: In a real application, you'd typically handle API calls on the server side
// to keep your API key secure. This is just for demonstration purposes.
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GENERATIVE_AI_API_KEY);

interface ChatDoppelProps {
  conversationHistory: string;
  name: string;
  gender: string;
  race: string;
  age: number;
  nationality: string;
  city: string;
  occupation: string;
  personality: string;
}

const ChatDoppel: React.FC<ChatDoppelProps> = ({
  conversationHistory,
  name,
  gender,
  race,
  age,
  nationality,
  city,
  occupation,
  personality
}) => {
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await chatDoppel(conversationHistory, name, gender, race, age, nationality, city, occupation, personality);
      setResponse(response);
    };

    fetchResponse();
  }, [conversationHistory, name, gender, race, age, nationality, city, occupation, personality]);

  return (
    <div style={{
      maxWidth: '600px',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      margin: '20px auto'
    }}>
      {response || 'Loading...'}
    </div>
  );
};

// Test implementation
const TestChatDoppel: React.FC = () => {
  const dummyData = {
    conversationHistory: "User: Hello, how are you today?\nAI: I'm doing well, thank you for asking. How about you?\nUser: How long have you lived in Toronto?",
    name: "Alex Johnson",
    gender: "Female",
    race: "Jamaican",
    age: 28,
    nationality: "Canadian",
    city: "Toronto",
    occupation: "Software Developer",
    personality: "introverted, creative, and analytical"
  };

  return (
    <div>
      <h1>ChatDoppel Test</h1>
      <ChatDoppel
        conversationHistory={dummyData.conversationHistory}
        name={dummyData.name}
        gender={dummyData.gender}
        race={dummyData.race}
        age={dummyData.age}
        nationality={dummyData.nationality}
        city={dummyData.city}
        occupation={dummyData.occupation}
        personality={dummyData.personality}
      />
    </div>
  );
};

// Default export for the page
const ChatDoppelPage: React.FC = () => {
  return (
    <div>
      <h1>Chat Doppel Page</h1>
      <TestChatDoppel />
    </div>
  );
};

export default ChatDoppelPage;