import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TodoApi = createApi({
    reducerPath: "todoApi",
    tagTypes: ["Todos"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
        }
    }),
    endpoints: (builder) => ({
        createTodo: builder.mutation({
            query: (body) => ({
                url: "/todos",
                method: "POST",
                body
            }),
            invalidatesTags: [{
                type: "Todos",
                id: "LIST"
            }]
        }),
        getTodos: builder.query({
            query: () => ({
                url: "/todos",
                method: "GET"
            }),
            providesTags: (result) => result 
              ? [
                    ...result.map(({ id }) => ({ type: "Todos", id })),
                    {type: "Todos", id: "LIST"}
                ]
              : [{type: "Todos", id: "LIST"}]
        }),
        deleteTodo: builder.mutation({
            query: (todoId) => ({
                url: `/todos/${todoId}`,
                method: "DELETE"
            }),
            invalidatesTags: [{
                type: "Todos",
                id: "LIST"
            }]
        }),
        updateTodo: builder.mutation({
            query: ({ todoId, body }) => ({
                url: `/todos/${todoId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: [{
                type: "Todos",
                id: "LIST"
            }]
        }),
        completeTodo: builder.mutation({
            query: (todoId) => ({
                url: `/todos/${todoId}`,
                method: "PATCH"
            }),
            invalidatesTags: [{
                type: "Todos",
                id: "LIST"
            }]
        })
    })
})

export const { useCreateTodoMutation, useGetTodosQuery, useDeleteTodoMutation, useUpdateTodoMutation,
useCompleteTodoMutation} = TodoApi;