import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

type DogListProps = {
  itemData: string[];
  cols: number;
  preferredDogs: any;
  addDogToFavorite: (item: string) => void;
  removeDogFromFavorite: (item: string) => void;
};

export default function DogList({
  itemData,
  cols = 2,
  preferredDogs,
  addDogToFavorite,
  removeDogFromFavorite,
}: DogListProps) {
  return (
    <ImageList sx={{ width: "100%" }} cols={cols}>
      {itemData.map((item: string) => {
        const isPreferred = preferredDogs.some((e: any) => e.url === item);
        return (
          <ImageListItem key={item}>
            <img
              src={`${item}?w=164&h=164&fit=cover&auto=format`}
              srcSet={`${item}?w=164&h=164&fit=cover&auto=format&dpr=2 2x`}
              alt={item}
              loading="lazy"
              onClick={() =>
                isPreferred
                  ? removeDogFromFavorite(item)
                  : addDogToFavorite(item)
              }
            />
            {isPreferred && <div>Saved</div>}
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}
