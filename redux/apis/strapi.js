// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:1337/'}),
    endpoints: (builder) => ({
        getPokemonByName: builder.query({
            query: (name) => `api/quizzes`,
            transformResponse: (response, meta, arg) => {
                console.log({response
                })
                return {
                    ...response.data,
                };
            },
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetPokemonByNameQuery} = pokemonApi