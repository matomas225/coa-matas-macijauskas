import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.scss";

const Home: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTestData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      setItems(response.data.data);
    } catch (err) {
      setError("Error while fetching data");
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
        {items && <p>Data From Backend:</p>}
        {items.map((item, i) => {
          return <p key={i + 1}>{item}</p>;
        })}
      </div>
    </>
  );
};

export default Home;
