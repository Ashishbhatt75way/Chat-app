import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { groupApi } from "../../services/group-api";

export const joinedGroupSlice = createSlice({
  name: "joinedGroup",
  initialState: {
    joinedGroups: [] as Group[],
  },
  reducers: {
    setJoinedGroups: (state, action) => {
      state.joinedGroups = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      groupApi.endpoints.getJoinedGroups.matchFulfilled,
      (state, action: PayloadAction<ApiResponse<Group[]>>) => {
        state.joinedGroups = action.payload.data;
      }
    );
  },
});

export const { setJoinedGroups } = joinedGroupSlice.actions;
export default joinedGroupSlice.reducer;
