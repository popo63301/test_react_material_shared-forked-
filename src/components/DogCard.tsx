import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type DogCardProps = {
  url: string;
  alt: string;
  text: string;
};

export default function DogCard({ url, alt, text }: DogCardProps) {
  return (
    <Card sx={{ width: 400 }}>
      <CardMedia component="img" height={300} image={url} alt={alt} />
      <CardContent>
        <Typography variant="h2" component="div">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}
