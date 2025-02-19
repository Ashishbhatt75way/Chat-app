import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store'

const baseUrl = import.meta.env.VITE_API_URL

export const messageApi = createApi({
  reducerPath: 'message',
  tagTypes: ['message'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], string>({
      query: (groupId: string) => `/message/${groupId}`,
      providesTags: ['message'],
    }),
    sendMessage: builder.mutation<Message, Omit<Message, '_id' | 'timestamp' >>({
      query: (message) => ({
        url: `/message/${message.groupId}`,
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['message'],
    }),
  }),
})

export const { useGetMessagesQuery, useSendMessageMutation } = messageApi
