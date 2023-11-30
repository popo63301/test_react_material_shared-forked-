import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function DogList({ itemData, cols = 2 }) {
  return (
    <ImageList sx={{ width: "100%" }} cols={cols} rowHeigdht={164}>
      {itemData.map((item) => (
        <ImageListItem key={item}>
          <img
            src={`${item}?w=164&h=164&fit=cover&auto=format`}
            srcSet={`${item}?w=164&h=164&fit=cover&auto=format&dpr=2 2x`}
            alt={item}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
