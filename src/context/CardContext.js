import React, { createContext, useReducer } from "react";

const initialValue = {
  cardNum: "",
  cardHolderName: "",
  validThruv: "",
  cvv: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "cardNum":
      return { ...state, cardNum: action.value };
    case "cardHolderName":
      return { ...state, cardHolderName: action.value };
    case "validThruv":
      return { ...state, validThruv: action.value };
    case "cvv":
      return { ...state, cvv: action.value };
    default:
      return state;
  }
}

const CardContext = createContext();

const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const updateCardDetails = (key, value) => {
    dispatch({ type: key, value });
  };

  const value = {
    cardDetails: state,
    updateCardDetails,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export { CardContext, CardProvider };
