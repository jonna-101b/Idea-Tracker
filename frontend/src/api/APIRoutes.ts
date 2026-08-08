import { type APIRoute } from "./types";

export const APIRoutes = {
    //authentication
    login: { path: '/auth/login', method: 'POST' } as APIRoute,
    signup: { path: '/auth/signup', method: 'POST' } as APIRoute,
    logout: { path: '/auth/logout', method: 'POST' } as APIRoute,
    getProfile: { path: '/auth/profile', method: 'GET' } as APIRoute,
    refreshToken: { path: '/auth/refresh', method: 'POST' } as APIRoute,

    //admin
    getAllUsers: { path: '/admin', method: 'GET' } as APIRoute,
    editUser: { path: '/admin/:id', method: 'PUT' } as APIRoute,
    deleteUser: { path: '/admin/:id', method: 'DELETE' } as APIRoute,


    //ideas
    getIdeas: { path: '/ideas', method: 'GET' } as APIRoute,
    getIdeaById: { path: '/ideas/:id', method: 'GET' } as APIRoute,
    createIdea: { path: '/ideas', method: 'POST' } as APIRoute,
    updateIdea: { path: '/ideas/:id', method: 'PUT' } as APIRoute,
    deleteIdea: { path: '/ideas/:id', method: 'DELETE' } as APIRoute,

};