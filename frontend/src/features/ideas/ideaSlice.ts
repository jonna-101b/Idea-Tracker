import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CreateIdeaPayload, Idea, UpdateIdeaPayload } from "../../models/idea.model";

interface IdeaState {
    ideas: Idea[];
    loading: boolean;
    error: string | null;
}

const initialState : IdeaState = {
    ideas: [],
    loading: false,
    error: null,
}

const ideaSlice = createSlice({
    name: "ideas",
    initialState,
    reducers: {
        fetchIdeas: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSuccess: (state, action: PayloadAction<Idea[]>) => {
            state.loading = false;
            state.error = null;
            state.ideas = action.payload;
        },
        fetchFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.ideas = [];
        },
        createIdea: (state, _action: PayloadAction<CreateIdeaPayload>) => {
            state.loading = true;
            state.error = null;
        },
        createSuccess: (state, action: PayloadAction<Idea>) => {
            state.loading = false;
            state.error = null;
            state.ideas = [ action.payload, ...state.ideas ]
        },
        createFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateIdea: (state, _action: PayloadAction<UpdateIdeaPayload>) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, action: PayloadAction<Idea>) => {
            state.loading = false;
            state.error = null;
            const index = state.ideas.findIndex((idea) => idea._id === action.payload._id)
            if (index != -1) state.ideas[index] = action.payload;
        },
        updateFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteIdea: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        deleteSuccess: (state, action: PayloadAction<Idea>) => {
            state.loading = false;
            state.error = null;
            state.ideas = state.ideas.filter((idea) => idea._id !== action.payload._id)
        },
        deleteFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    fetchIdeas,
    fetchSuccess,
    fetchFailure,
    createIdea,
    createSuccess,
    createFailure,
    updateIdea,
    updateSuccess,
    updateFailure,
    deleteIdea,
    deleteSuccess,
    deleteFailure,
} = ideaSlice.actions;

export default ideaSlice.reducer;