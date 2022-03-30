import { useContext, useEffect, useState } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import BasicCard from "./BasicCard";
import Form from "@rjsf/material-ui";
import { CardContext } from "../context/CardContext";

const uiSchema = {
  "ui:widget": "TextField",
};

const handleSubmit = ({ formData }, id) => {
  fetch(`http://localhost:3001/cards/${id}`, {
    method: "PUT",
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

const AddCard = () => {
  const [cardData, setCardData] = useState({});
  const { updateCardDetails } = useContext(CardContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/cards/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCardData(data);
      });
  }, []);

  useEffect(() => {
    Object.entries(cardData).map(
      (o) => o[0] !== "id" && updateCardDetails(o[0], o[1])
    );
  }, [cardData]);

  const schema = {
    type: "object",
    required: ["cvv", "cardNum"],
    properties: {
      cardNum: {
        type: "string",
        title: "Card Number",
        name: "cardNum",
        default: cardData?.cardNum,
      },
      cardHolderName: {
        type: "string",
        title: "Card Holder Name",
        name: "cardHolderName",
        default: cardData?.cardHolderName,
      },
      validThruv: {
        type: "string",
        title: "Valid Thruv",
        name: "validThruv",
        default: cardData?.validThruv,
      },
      cvv: {
        type: "string",
        title: "Security Code CVV",
        name: "cvv",
        default: cardData?.cvv,
      },
    },
  };

  const CustomTextField = (props) => {
    const { updateCardDetails } = useContext(CardContext);
    return (
      <TextField
        id="outlined-name"
        label={props.label}
        value={props.value}
        onChange={(event) => {
          props.onChange(event.target.value);
          updateCardDetails(props.schema.name, event.target.value);
          setCardData((prev) => ({
            ...prev,
            [props.schema.name]: event.target.value,
          }));
        }}
      />
    );
  };

  const widgets = {
    TextWidget: CustomTextField,
  };

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
        onSubmit={(formData) => handleSubmit(formData, id)}
      />
    </Container>
  );
};

export default AddCard;
