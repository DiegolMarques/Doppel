//make a component that displays the username from by talking to the api from localhost:8000/users/user

import { useEffect, useState } from 'react';
import { api } from '../utils/api';

const UsernameBox = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8000/users/user");
      console.log(res);
      const data = await res.json();
      setUsername(data[0].name);
    };
    fetchData();
  }, []);


  return <div> <h1 className="text text-xxl m-10">Hello World {username}!</h1></div>;
};

export default UsernameBox;