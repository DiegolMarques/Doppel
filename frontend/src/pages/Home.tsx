// src/components/Home.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import UsernameBox from '../components/UsernameBox';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <UsernameBox />
      </div>
    </div>
  );
};

export default Home;