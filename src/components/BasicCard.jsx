import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { CardContext } from "../context/CardContext";

export default function BasicCard() {
  const { cardDetails } = useContext(CardContext);

  return (
    <Card sx={{ minWidth: 275, backgroundColor: "#00abff" }}>
      <CardContent>
        <Typography sx={{ mb: 2 }} variant="h5" component="div">
          {cardDetails?.cardNum || "---- ---- ---- ----"}
        </Typography>

        <Grid container space={2} justifyContent="space-between">
          <Grid item>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              CardHolder Name
            </Typography>
            <Typography>{cardDetails?.cardHolderName}</Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Valid Thruv
            </Typography>
            <Typography>{cardDetails?.validThruv}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
