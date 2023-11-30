import { Container } from "@mui/material";
import { Link } from "react-router-dom";

const PreferredBreeds = () => (
  <main className="App">
    <Container>
      <h1>Preferred Breeds</h1>
      <div>
        <Link to="/">Home</Link>
      </div>
    </Container>
  </main>
);

export default PreferredBreeds;
