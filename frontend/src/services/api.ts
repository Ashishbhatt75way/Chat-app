import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store'

const baseUrl = import.meta.env.VITE_API_URL

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<any, unknown, unknown> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/users/refresh-token',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions,
      )

      if (refreshResult.data) {
        api.dispatch({
          type: 'auth/setTokens',
          payload: refreshResult.data,
        })

        result = await baseQuery(args, api, extraOptions)
      } else {
        api.dispatch({ type: 'auth/logout' })
      }
    } else {
      api.dispatch({ type: 'auth/logout' })
    }
  }
  return result
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    me: builder.query<ApiResponse<User>, void>({
      query: () => '/users/me',
      providesTags: ['Users'],
    }),
    login: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string }>,
      { email: string; password: string }
    >({
      query: (body) => ({ url: '/users/login', method: 'POST', body }),
    }),
    register: builder.mutation<
      ApiResponse<User>,
      Omit<User, '_id' | 'active' | 'role'> & { confirmPassword: string }
    >({
      query: (body) => ({ url: '/users/register', method: 'POST', body }),
    }),
    updateUser: builder.mutation<ApiResponse<User>, User>({
      query: (body) => ({ url: `/users/${body._id}`, method: 'PUT', body }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: '/users/logout', method: 'POST' }),
      invalidatesTags: ['Users'],
    }),
    getAnalytics: builder.query<ApiResponse<Analytics>, void>({
      query: () => '/users/get-analytics',
    }),
  }),
})

export const {
  useMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetAnalyticsQuery,
} = api
