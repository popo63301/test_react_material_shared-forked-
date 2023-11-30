import { useEffect, useState } from "react";
import { Container } from "@mui/material";

import DogCard from "./components/DogCard";
import DogList from "./components/DogList";
import Dropdown from "./components/Dropdown";

import { prepareBreeds } from "./utils";
import { fetchImages } from "./utils/api";

import "./styles.css";

const dogBreedlist = ["labrador"];

const dogCountChoices = Array.from(Array(50).keys(), (item) => item + 1);

const columnChoices = [1];

export default function App() {
  const [breedList, setBreedList] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("Select a breed");
  const [selectedImage, setSelectedImage] = useState(
    "https://dnatestingchoice.com/perch/resources/main-picture-dog-1.jpg"
  );
  const [selectedDogCountChoices, setSelectedDogCountChoices] = useState(5);
  const [dogList, setDogList] = useState([]);

  useEffect(() => {
    async function initialCall() {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");
      const breeds = await response.json();
      setBreedList(prepareBreeds(breeds.message));
    }
    initialCall();
  }, []);

  const selectBreed = async (breed) => {
    const res = await fetchImages(breed, selectedDogCountChoices);
    setSelectedBreed(breed);
    setDogList(res);
  };

  return (
    <main className="App">
      <Container>
        <h1>Choose your dog</h1>
        <div className="App_head">
          <div className="App_head_dropdowns">
            <Dropdown
              onChange={(breed) => selectBreed(breed)}
              label="Choose a dog"
              values={breedList}
              currentValue={selectedBreed}
            />
            <Dropdown
              onChange={(count) => setSelectedDogCountChoices(count)}
              label="How many dogs"
              values={dogCountChoices}
              currentValue={selectedDogCountChoices}
            />
            <Dropdown
              onChange={(event) => event}
              label="How many columns"
              values={columnChoices}
              currentValue=""
            />
          </div>
          <DogCard
            url={selectedImage}
            alt={selectedBreed}
            text={selectedBreed}
          />
        </div>
        <DogList itemData={dogList} cols={2} />
      </Container>
    </main>
  );
}
