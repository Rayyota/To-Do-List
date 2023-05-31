import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json")
        }
    }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (body) => ({
                url: "/signup",
                method: "POST",
                body,
            }) 
        }),
        signIn: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            })
        })
    })
})

export const { useSignUpMutation, useSignInMutation } = AuthApi;
