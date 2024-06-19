import { useEffect, useState } from 'react';

const UsernameBox = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8000/users/user');
      const data = await res.json();
      console.log(data[0]);
      setUsername(data[0].name);
    };
    fetchData();
  }, []);


  return <div> <h1 className="text text-xxl m-10">Hello World {username}!</h1></div>;
};

export default UsernameBox;