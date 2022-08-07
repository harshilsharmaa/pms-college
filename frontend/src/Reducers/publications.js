import {createReducer} from '@reduxjs/toolkit';


const initialState = {};

export const publicationsReducer = createReducer(initialState,{
    GetAllPublicationsRequest: (state)=>{
        state.loading = true;
    },
    GetAllPublicationsSuccess: (state, action)=>{
        state.loading = false;
        state.publications = action.payload;
    },
    GetAllPublicationsFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

// export const myPublicationsReducer = createReducer(initialState,{

    MyPublicationRequest: (state)=>{
        state.loading = true;
    },
    MyPublicationSuccess: (state, action)=>{
        state.loading = false;
        state.publications = action.payload;
    },
    MyPublicationFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state)=>{
        state.error = null;
    },
    clearMessage: (state)=>{
        state.message = null;
    }
});

export const addPublicationReducer = createReducer(initialState,{
    AddPublicationRequest: (state)=>{
        state.loading = true;
    },
    AddPublicationSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    AddPublicationFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state)=>{
        state.error = null;
    },
    clearMessage: (state)=>{
        state.message = null;
    }
})

export const deletePublicationReducer = createReducer(initialState,{
    DeletePublicationRequest: (state)=>{
        state.loading = true;
    },
    DeletePublicationSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    DeletePublicationFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state)=>{
        state.error = null;
    },
    clearMessage: (state)=>{
        state.message = null;
    }
})

export const editPublicationReducer = createReducer(initialState,{
    EditPublicationRequest: (state)=>{
        state.loading = true;
    },
    EditPublicationSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    EditPublicationFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    }
})

export const getPublicationByIdReducer = createReducer(initialState,{
    GetPublicationByIdRequest: (state)=>{
        state.loading = true;
    },
    GetPublicationByIdSuccess: (state, action)=>{
        state.loading = false;
        state.publicationById = action.payload;
    },
    GetPublicationByIdFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    }
})