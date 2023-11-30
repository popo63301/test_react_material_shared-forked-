import { checkSubbreed } from "./index";

export const fetchImages = async (breed: string, count: number) => {
  let response;

  if (checkSubbreed(breed)) {
    const [part1, part2] = breed.split(" ");

    response = await fetch(
      `https://dog.ceo/api/breed/${part1}/${part2}/images/random/${count}`
    );
  } else {
    response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random/${count}`
    );
  }

  const images = await response.json();

  return images.message;
};
