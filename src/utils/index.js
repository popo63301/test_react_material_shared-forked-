export const prepareBreeds = (breeds) =>
  Object.keys(breeds)
    .map((e) => {
      if (breeds[e].length > 0) {
        const subBreeds = [...breeds[e]].map((subbreed) => `${e} ${subbreed}`);

        return subBreeds;
      }
      return e;
    })
    .flat();
