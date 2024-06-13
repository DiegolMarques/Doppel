//make a component that displays the username from by talking to the api from localhost:8000/users/user

import { useEffect, useState } from 'react';

const UsernameBox = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    fetch('http:localhost:8000/users/user')
      .then((res) => res.json())
      .then((data) => setUsername(data[0].name));
  }, []);


  console.log(fetch('http:localhost:8000/users/user').then((res) => res.json()));

  return <div> <h1 className="text text-xxl m-10">Hello World {username}!</h1></div>;
};

export default UsernameBox;