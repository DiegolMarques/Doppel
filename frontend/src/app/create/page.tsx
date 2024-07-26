'use client';
import React, { useState, useEffect } from 'react';
import {chatDoppel, generateDoppels} from '@/lib/gemini';

const TestGenerateDoppels: React.FC = () => {
  const [output, setOutput] = useState<string[][] | string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await generateDoppels(
          '5',
          'male',
          'Caucasian',
          '18-25',
          'American',
          'New York',
          'University student',
          'Random'
        );
        setOutput(result);
      } catch (err) {
        setError('An error occurred while generating doppels');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '600px', 
        width: '100%', 
        border: '1px solid #ccc', 
        padding: '20px', 
        borderRadius: '8px'
      }}>
        <h1>Generate Doppels Test</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {output && (
          <div>
            <h2>Output:</h2>
            {Array.isArray(output) ? (
              <ul>
                {output.map((item, index) => (
                  <li key={index}>{JSON.stringify(item)}</li>
                ))}
              </ul>
            ) : (
              <p>{output}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestGenerateDoppels;