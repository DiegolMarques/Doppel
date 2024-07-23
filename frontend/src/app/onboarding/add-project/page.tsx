'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Loader2, Ghost } from "lucide-react";
import ProgressDots from '@/components/ProgressDots';

const genderOptions = ['Male', 'Female', 'Non-binary', 'Other', 'Random'];
const raceOptions = ['Asian', 'Black', 'Hispanic', 'White', 'Mixed', 'Other', 'Random'];

export default function CreateDoppels() {
  const [projectName, setProjectName] = useState('');
  const [gender, setGender] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [occupation, setOccupation] = useState('');
  const [race, setRace] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [numOfDoppels, setNumOfDoppels] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);

    //TODO: PULL CURRENT SIGNED IN USER AND SEND ALONG WITH OTHER INFO
    
    try {
      const response = await fetch('/api/createDoppels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectName, gender, ageRange, occupation, race, countryOfOrigin, numOfDoppels }),
      });

      if (response.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error creating doppels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Create Your Doppels</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-4">
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              {genderOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Age Range (e.g., 25-35) or 'Random'"
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Occupation or 'Random'"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <select
              value={race}
              onChange={(e) => setRace(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Race</option>
              {raceOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Country of Origin or 'Random'"
              value={countryOfOrigin}
              onChange={(e) => setCountryOfOrigin(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              placeholder="How many Doppels?"
              value={numOfDoppels}
              onChange={(e) => setNumOfDoppels(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <button 
              type="submit" 
              className={buttonVariants({ size: "lg", className: 'w-full' })}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <ArrowRight className="h-4 w-4 mr-2" />
              )}
              Create Doppels
            </button>
          </form>

          <div className="w-full md:w-1/2">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Doppels Preview</h2>
             
              <div className="space-y-2">
                <p><strong>Project Name:</strong> {projectName || 'Not set'}</p>
                <p><strong>Gender:</strong> {gender || 'Not set'}</p>
                <p><strong>Age Range:</strong> {ageRange || 'Not set'}</p>
                <p><strong>Occupation:</strong> {occupation || 'Not set'}</p>
                <p><strong>Race:</strong> {race || 'Not set'}</p>
                <p><strong>Country of Origin:</strong> {countryOfOrigin || 'Not set'}</p>
                <p><strong># of Doppel:</strong> {numOfDoppels || 'Not set'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProgressDots totalSteps={3} currentStep={3} />
    </div>
  );
}