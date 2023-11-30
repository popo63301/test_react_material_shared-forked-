import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function DogList({
  itemData,
  cols = 2,
  preferredDogs,
  addDogToFavorite,
  removeDogToFavorite,
}) {
  return (
    <ImageList sx={{ width: "100%" }} cols={cols} rowHeigdht={164}>
      {itemData.map((item) => {
        const isPreferred = preferredDogs.some((e) => e.url === item);
        return (
          <ImageListItem key={item}>
            <img
              src={`${item}?w=164&h=164&fit=cover&auto=format`}
              srcSet={`${item}?w=164&h=164&fit=cover&auto=format&dpr=2 2x`}
              alt={item}
              loading="lazy"
              onClick={() =>
                isPreferred ? removeDogToFavorite(item) : addDogToFavorite(item)
              }
            />
            {isPreferred && <div>Saved</div>}
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}
