// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "qs";

const queryGetQuizById = qs.stringify(
  {
    populate: {
      questions: {
        populate: ["answers"],
      },
      translate_from: {
        populate: "*",
      },
      translate_to: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_STRAPI_BASE_URL,
  }),
  tagTypes: [
    "questionCache",
    "quizListCache",
    "AllQuestionsForQuizCache",
    "resultCache",
    "languageCache",
  ],
  endpoints: (builder) => ({
    getAllQuizzes: builder.query({
      query: (payload) => `api/quizzes?${payload?.query ? payload.query : ''}`,
      providesTags: ["quizListCache"],
    }),
    getQuizById: builder.query({
      query: ({ selectedQuizId }) => {
        return `api/quizzes/${selectedQuizId}?${queryGetQuizById}`;
      },
      transformResponse: (response, meta, arg) => {
        // The if statement below is to populate a default value for the combobox in the "QuizSettings" component
        if (!response.data.attributes.translate_to.data) {
          response.data.attributes.translate_to.data = {
            id: "xxxx",
            attributes: {
              title: "choose language",
            },
          };
        }

        return {
          ...response.data,
        };
      },
      providesTags: ["questionCache"],
    }),
    AddQuiz: builder.mutation({
      query: (body) => ({
        url: `api/quizzes`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["questionCache", "quizListCache"],
    }),
    UpdateQuiz: builder.mutation({
      query: (payload) => ({
        url: `api/quizzes/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["questionCache", "quizListCache", "AllQuestionsForQuizCache"],
    }),
    DeleteQuiz: builder.mutation({
      query: (payload) => ({
        url: `api/quizzes/${payload.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["questionCache", "quizListCache"],
    }),
    AddQuestion: builder.mutation({
      query: (body) => ({
        url: `api/questions`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["questionCache", "quizListCache"],
    }),
    GetAllQuestionsForQuiz: builder.query({
      query: (payload) => ({
        url: `api/questions?${payload.query}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
      providesTags: ["AllQuestionsForQuizCache"],
    }),
    AddBlankQuestion: builder.mutation({
      query: (body) => ({
        url: `api/addquestion`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["questionCache", "quizListCache"],
    }),
    AddAnswer: builder.mutation({
      query: (body) => ({
        url: `api/answers`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["questionCache", "quizListCache"],
    }),
    UpdateQuestion: builder.mutation({
      query: (body) => ({
        url: `api/questions/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["questionCache", "quizListCache"],
    }),
    DeleteQuestion: builder.mutation({
      query: (body) => ({
        url: `api/questions/${body.id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["questionCache", "quizListCache"],
    }),
    DeleteAnswer: builder.mutation({
      query: (body) => ({
        url: `api/answers/${body.id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["questionCache", "quizListCache"],
    }),
    UpdateAnswer: builder.mutation({
      query: (body) => ({
        url: `api/answers/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["questionCache", "quizListCache"],
    }),
    AddResults: builder.mutation({
      query: (body) => ({
        url: `api/results`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["resultCache"],
    }),
    UpdateResultsById: builder.mutation({
      query: (body) => ({
        url: `api/results/${body.id}?populate=*`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["resultCache"],
    }),
    getResultsById: builder.query({
      query: ({ id }) => {
        return `api/results/${id}?populate=*`;
      },
      transformResponse: (response, meta, arg) => {
        return response;
      },
      providesTags: ["resultCache"],
    }),
    getAllLanguages: builder.query({
      query: (name) => `api/languages`,
      transformResponse(response, meta, arg) {
        const transformedLanguages = [];
        response.data.map((language, index) => {
          transformedLanguages.push({
            id: language.id,
            name: language.attributes.title,
          });
        });
        return transformedLanguages;
      },
      providesTags: ["languageCache"],
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
  useAddBlankQuestionMutation,
  useDeleteQuestionMutation,
  useDeleteAnswerMutation,
  useDeleteQuizMutation,
  useGetAllQuestionsForQuizQuery,
  useAddResultsMutation,
  useGetResultsByIdQuery,
  useUpdateResultsByIdMutation,
  useGetAllLanguagesQuery,
} = pokemonApi;
