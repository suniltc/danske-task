import { useContext } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import BasicCard from "./BasicCard";
import Form from "@rjsf/material-ui";
import { CardContext } from "../context/CardContext";

const schema = {
  type: "object",
  required: ["cvv", "cardNum"],
  properties: {
    cardNum: { type: "string", title: "Card Number", name: "cardNum" },
    cardHolderName: {
      type: "string",
      title: "Card Holder Name",
      name: "cardHolderName",
    },
    validThruv: { type: "string", title: "Valid Thruv", name: "validThruv" },
    cvv: { type: "string", title: "Security Code CVV", name: "cvv" },
  },
};

const uiSchema = {
  "ui:widget": "TextField",
};

const handleSubmit = ({ formData }) => {
  fetch("http://localhost:3001/cards", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const CustomTextField = (props) => {
  const { updateCardDetails } = useContext(CardContext);

  const handleChange = (e) => {
    props.onChange(e.target.value);
    updateCardDetails(props.schema.name, e.target.value);
  };

  return (
    <TextField
      id="outlined-name"
      label={props.label}
      value={props.value}
      onChange={(event) => handleChange(event)}
    />
  );
};

const widgets = {
  TextWidget: CustomTextField,
};

const AddCard = () => {
  return (
    <Container maxWidth="md">
      <h1>Credit Card</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Link to="/">
            <Button variant="outlined">Back</Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <BasicCard />
        </Grid>
      </Grid>

      <Form
        schema={schema}
        uiSchema={uiSchema}
        widgets={widgets}
        onSubmit={(formData) => handleSubmit(formData)}
      />
    </Container>
  );
};

export default AddCard;
