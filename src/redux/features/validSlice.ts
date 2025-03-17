import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userTriggeredCard: "",
  isErrorOpen: false,
  cardName: "BasicInformation",
  isDisableSubmitButton: false,
};

const validSlice = createSlice({
  name: "valid",
  initialState,
  reducers: {
    setUserTriggeredCard: (state, action) => {
      state.userTriggeredCard = action.payload;
    },
    setErrorOpen: (state, action) => {
      state.isErrorOpen = action.payload;
    },
    setCardName: (state, action) => {
      state.cardName = action.payload;
    },
    setIsDisableSubmitButton: (state, action) => {
      state.isDisableSubmitButton = action.payload;
    },
  },
});

export const {
  setUserTriggeredCard,
  setErrorOpen,
  setCardName,
  setIsDisableSubmitButton,
} = validSlice.actions;

export default validSlice.reducer;
