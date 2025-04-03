import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.scss";
import { apiPaths } from "@/services/api";

type User = {
  _id: string;
  age: number;
  lastName: string;
  movies: string[];
  name: string;
};

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTestData = async () => {
    try {
      const response = await axios.get(apiPaths.getUsers);
      setUsers(response.data);
    } catch (err) {
      setError(`Error while fetching data: ${err}`);
    }
  };

  useEffect(() => {
    fetchTestData();
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      {error && <p>{error}</p>}
      <div className="items">
        {users && <p>Data From Backend:</p>}
        {users.map((user, i) => {
          return <p key={i + 1}>{user.name},</p>;
        })}
      </div>
    </>
  );
};

export default Home;
