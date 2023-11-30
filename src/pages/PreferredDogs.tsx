import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

type Dog = {
  breed: string;
  url: string;
};

const PreferredDogs = () => {
  const [preferredDogs, setPreferredDogs] = useState([]);

  useEffect(() => {
    const dogs = localStorage.getItem("dogs");
    if (dogs) {
      setPreferredDogs(JSON.parse(dogs));
    }
  }, []);

  const removeDogFromFavorite = (url: string) => {
    const newFavorites = [...preferredDogs].filter((e: Dog) => e.url !== url);
    setPreferredDogs(newFavorites);
    localStorage.setItem("dogs", JSON.stringify(newFavorites));
  };

  return (
    <main className="App">
      <Container>
        <h1>Preferred Breeds</h1>
        <div>
          <Link to="/">Home</Link>
          {preferredDogs.length === 0 && <h3>Aucun chien</h3>}
          {preferredDogs.length > 0 && <h3>Cliquez pour supprimer</h3>}
          <div
            style={{
              maxWidth: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 auto",
            }}
          >
            {preferredDogs.map((e: Dog, index) => (
              <div
                key={index}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <img
                  src={`${e.url}?w=164&h=164&fit=cover&auto=format`}
                  srcSet={`${e.url}?w=164&h=164&fit=cover&auto=format&dpr=2 2x`}
                  alt={e.breed}
                  loading="lazy"
                  onClick={() => removeDogFromFavorite(e.url)}
                  style={{ cursor: "pointer" }}
                />
                {e.breed}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default PreferredDogs;
