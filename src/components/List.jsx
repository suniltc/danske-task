import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Grid, Paper, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
}));

export default function CheckboxListSecondary() {
  const [cards, setCards] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const buttonProps = {
    size: isSmallScreen ? "medium" : "small",
    fullWidth: isSmallScreen ? true : false,
  };

  useEffect(() => {
    fetch("http://localhost:3001/cards")
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/cards/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        const updateCards = cards.filter((o) => o.id !== id);
        setCards(updateCards);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
      {cards?.map((card) => (
        <StyledPaper
          sx={{
            my: 1,
            mx: "auto",
            p: 2,
          }}
          key={card.id}
        >
          <Grid container spacing={2}>
            <Grid container item xs={12} md={10} spacing={2}>
              <Grid item xs={12}>
                {card.cardHolderName}
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={8} md={10}>
                  {card.cardNum}
                </Grid>
                <Grid item xs={4} md={2}>
                  {card.validThruv}
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={2}
              spacing={2}
              justifyContent="flex-end"
            >
              <Grid item xs={6} md={12}>
                <Button
                  color="error"
                  variant="contained"
                  style={{ minWidth: "120px" }}
                  {...buttonProps}
                  onClick={() => handleDelete(card.id)}
                >
                  Delete Card
                </Button>
              </Grid>
              <Grid item xs={6} md={12}>
                <Link to={`/edit-card/${card.id}`}>
                  <Button
                    color="warning"
                    variant="contained"
                    style={{ minWidth: "120px" }}
                    {...buttonProps}
                  >
                    Edit Card
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </StyledPaper>
      ))}
    </Box>
  );
}
