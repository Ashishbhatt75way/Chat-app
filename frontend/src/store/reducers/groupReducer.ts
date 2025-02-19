import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { groupApi } from "../../services/group-api";

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    groups: [] as Group[],
  },
  reducers: {
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      groupApi.endpoints.getGroups.matchFulfilled,
      (state, action: PayloadAction<ApiResponse<Group[]>>) => {
        state.groups = action.payload.data;
      }
    );
  },
});

export const { setGroups } = groupSlice.actions;
export default groupSlice.reducer;
