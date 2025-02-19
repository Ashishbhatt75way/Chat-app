import { messageApi } from "../../services/message-api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [] as Message[],
  },
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      messageApi.endpoints.getMessages.matchFulfilled,
      (state, action: PayloadAction<Message[]>) => {
        state.messages = action.payload;
      }
    );
    builder.addMatcher(
      messageApi.endpoints.sendMessage.matchFulfilled,
      (state, action: PayloadAction<Message>) => {
        state.messages.push(action.payload);
      }
    );
  },
});

export const { setMessages } = chatSlice.actions;

export default chatSlice.reducer;
