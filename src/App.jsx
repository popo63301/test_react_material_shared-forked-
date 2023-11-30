import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

import DogCard from "./components/DogCard";
import DogList from "./components/DogList";
import Dropdown from "./components/Dropdown";

import { prepareBreeds } from "./utils";
import { fetchImages } from "./utils/api";

import "./styles.css";

const dogCountChoices = Array.from(Array(50).keys(), (item) => item + 1);
const columnChoices = Array.from(Array(4).keys(), (item) => item + 1);

const defaultText = "Select a breed";

export default function App() {
  const [breedList, setBreedList] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(defaultText);
  const [selectedImage, setSelectedImage] = useState(
    "https://dnatestingchoice.com/perch/resources/main-picture-dog-1.jpg"
  );
  const [selectedDogCountChoices, setSelectedDogCountChoices] = useState(5);
  const [selectedColumnChoice, setSelectedColumnChoice] = useState(3);
  const [dogList, setDogList] = useState([]);
  const [preferredDogs, setPreferredDogs] = useState([]);

  useEffect(() => {
    async function initialCall() {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");
      const breeds = await response.json();
      setBreedList(prepareBreeds(breeds.message));
    }

    const dogs = localStorage.getItem("dogs");
    if (dogs) {
      setPreferredDogs(JSON.parse(dogs));
    }

    initialCall();
  }, []);

  useEffect(() => {
    selectedBreed != defaultText && selectBreed();
  }, [selectedBreed, selectedDogCountChoices, selectedColumnChoice]);

  const selectBreed = async () => {
    const res = await fetchImages(selectedBreed, selectedDogCountChoices);
    setDogList(res);
    setSelectedImage(res[0]);
  };

  const addDogToFavorite = (url) => {
    const newFavorites = [...preferredDogs, { url, breed: selectedBreed }];
    setPreferredDogs(newFavorites);
    localStorage.setItem("dogs", JSON.stringify(newFavorites));
  };

  const removeDogFromFavorite = (url) => {
    const newFavorites = [...preferredDogs].filter((e) => e.url !== url);
    setPreferredDogs(newFavorites);
    localStorage.setItem("dogs", JSON.stringify(newFavorites));
  };

  return (
    <main className="App">
      <Container>
        <h1>Choose your dog</h1>
        <div className="App_head">
          <div className="App_head_dropdowns">
            <Dropdown
              onChange={(breed) => setSelectedBreed(breed)}
              label="Choose a dog"
              values={breedList}
              currentValue={selectedBreed === defaultText ? "" : selectedBreed}
            />
            <Dropdown
              onChange={(count) => setSelectedDogCountChoices(count)}
              label="How many dogs"
              values={dogCountChoices}
              currentValue={selectedDogCountChoices}
            />
            <Dropdown
              onChange={(columnChoice) => setSelectedColumnChoice(columnChoice)}
              label="How many columns"
              values={columnChoices}
              currentValue={selectedColumnChoice}
            />
            <Link to="/favorites">Prefered breeds</Link>
          </div>
          <DogCard
            url={selectedImage}
            alt={selectedBreed}
            text={selectedBreed}
          />
        </div>
        {dogList.length > 0 && <h3>Cliquez pour ajouter aux favoris</h3>}
        <DogList
          itemData={dogList}
          cols={selectedColumnChoice}
          breed={selectedBreed}
          preferredDogs={preferredDogs}
          addDogToFavorite={addDogToFavorite}
          removeDogFromFavorite={removeDogFromFavorite}
        />
      </Container>
    </main>
  );
}
