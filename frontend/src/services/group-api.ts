import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseUrl = import.meta.env.VITE_API_URL;

export const groupApi = createApi({
  reducerPath: "groupApi",
  tagTypes: ["Group", "JoinRequests"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  
  endpoints: (builder) => ({
    getGroups: builder.query<ApiResponse<Group[]>, void>({
      query: () => `/group`,
      providesTags: ["Group"],
    }),
    createGroup: builder.mutation<
      ApiResponse<Group>,
      Omit<Group, "_id" | "active" | "admins" | "members">
    >({
      query: (body) => ({
        url: `/group/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Group"],
    }),
    join: builder.mutation<
      ApiResponse<Group>,
      { groupId: string; userId: string }
    >({
      query: ({ groupId, userId }) => ({
        url: `/group/${groupId}/join`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["Group"],
    }),
    getJoinedGroups: builder.query<ApiResponse<Group[]>, void>({
      query: () => `/group/joined`,
    }),

    // Request to Join Group
    requestToJoin: builder.mutation<void, string>({
      query: (groupId) => ({
        url: `/group/${groupId}/join-request`,
        method: "POST",
      }),
      invalidatesTags: ["JoinRequests"],
    }),

    // Approve Join Request
    approveRequest: builder.mutation<void, { groupId: string; userId: string }>(
      {
        query: ({ groupId, userId }) => ({
          url: `/group/${groupId}/approve/`,
          method: "POST",
          body : {userId}
        }),
        invalidatesTags: ["JoinRequests"],
      }
    ),

    // Decline Join Request
    declineRequest: builder.mutation<void, { groupId: string; userId: string }>(
      {
        query: ({ groupId, userId }) => ({
          url: `/group/${groupId}/decline`,
          method: "DELETE",
          body : {userId}
        }),
        invalidatesTags: ["JoinRequests"],
      }
    ),

    // Get Join Requests
    getJoinRequests: builder.query<ApiResponse<User[]>, void>({
      query: () => `/group/join-requests`,
      providesTags: ["JoinRequests"],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useCreateGroupMutation,
  useJoinMutation,
  useGetJoinedGroupsQuery,
  useRequestToJoinMutation,
  useApproveRequestMutation,
  useDeclineRequestMutation,
  useGetJoinRequestsQuery,
} = groupApi;
