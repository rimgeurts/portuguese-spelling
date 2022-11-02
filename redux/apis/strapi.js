// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "qs";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_STRAPI_BASE_URL,
  }),
  tagTypes: ["quizCache"],
  endpoints: (builder) => ({
    getAllQuizzes: builder.query({
      query: (name) => `api/quizzes`,
    }),
    getQuizById: builder.query({
      query: ({ selectedQuizId }) => {
        const query = qs.stringify(
          {
            populate: {
              questions: {
                populate: ["answers"],
              },
            },
          },
          {
            encodeValuesOnly: true, // prettify URL
          }
        );
        return `api/quizzes/${selectedQuizId}?${query}`;
      },
      transformResponse: (response, meta, arg) => {
        return {
          ...response.data,
        };
      },
      providesTags: ["quizCache"],
    }),
    AddQuiz: builder.mutation({
      query: (body) => ({
        url: `api/quizzes`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["quizCache"],
    }),
    UpdateQuiz: builder.mutation({
      query: (payload) => ({
        url: `api/quizzes/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["quizCache"],
    }),
    AddAnswer: builder.mutation({
      query: (body) => ({
        url: `api/answers`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["quizCache"],
    }),
    AddQuestion: builder.mutation({
      query: (body) => ({
        url: `api/questions`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["quizCache"],
    }),
    UpdateQuestion: builder.mutation({
      query: (body) => ({
        url: `api/questions/${body.id}`,
        method: "PUT",
        body,
      }),
    }),
    UpdateAnswer: builder.mutation({
      query: (body) => ({
        url: `api/answers/${body.id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllQuizzesQuery,
  useGetQuizByIdQuery,
  useAddQuizMutation,
  useUpdateQuizMutation,
  useAddAnswerMutation,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useUpdateAnswerMutation,
} = pokemonApi;
