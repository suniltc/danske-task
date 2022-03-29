import "./App.css";
import { Button, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import List from "./components/List";

function App() {
  return (
    <Container maxWidth="lg">
      <h1>List of Credit Cards</h1>
      <Grid container sx={{ px: 2 }} justifyContent={"flex-end"}>
        <Link to="/add-new-card">
          <Button variant="contained" color="warning">
            + Add Credit Card
          </Button>
        </Link>
      </Grid>
      <List />
    </Container>
  );
}

export default App;
