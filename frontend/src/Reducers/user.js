import {createReducer} from '@reduxjs/toolkit';


const initialState = {};

export const userReducer = createReducer(initialState,{

    LoginRequest: (state)=>{
        state.loading = true;
    },
    LoginSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticate = true;
    },
    LoginFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticate = false;
    },

    LoadUserRequest: (state)=>{
        state.loading = true;
    },
    LoadUserSuccess: (state,action)=>{
        state.loading = false;
        state.isAuthenticate = true;
        state.user = action.payload;
    },
    LoadUserFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticate = false;
    },
    
    LogoutUserRequest: (state)=>{
        state.loading = true;
    },
    LogoutUserSuccess: (state)=>{
        state.loading = false;
        state.user = null;
        state.isAuthenticate = false;
    },
    LogoutUserFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticate = true;
    },
    clearError: (state)=>{
        state.error = null;
    },
    clearMessage: (state)=>{
        state.message = null;
    },
    clearUser: (state)=>{
        state.error = null;
        state.user = null;
        state.isAuthenticate = false;
        state = undefined;
    },
});

export const registerUserReducer = createReducer(initialState,{
    RegisterRequest: (state)=>{
        state.loading = true;
    },
    RegisterSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticate = true;
    },
    RegisterFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticate = false;
    },
    clearError: (state)=>{
        state.error = null;
    },
    clearMessage: (state)=>{
        state.message = null;
    },
    clearUser: (state)=>{
        state.error = null;
        state.user = null;
        state.isAuthenticate = false;
        state = undefined;
    },
})

export const forgotPasswordReducer = createReducer(initialState,{
    ResetPasswordRequest: (state)=>{
        state.loading = true;
    },
    ResetPasswordSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    ResetPasswordFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state)=>{
        state.error = null;
    },
    clearMessage: (state)=>{
        state.message = null;
    },
    clearUser: (state)=>{
        state.error = null;
        state.user = null;
        state.isAuthenticate = false;
        state = undefined;
    },

})


export const updateProfileReducer = createReducer(initialState,{
    UpdateProfileRequest: (state)=>{
        state.loading = true;
    }
    ,
    UpdateProfileSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    }
    ,
    UpdateProfileFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state)=>{
        state.error = null;
    },
    clearMessage: (state)=>{
        state.message = null;
    },
    clearUser: (state)=>{
        state.error = null;
        state.user = null;
        state.isAuthenticate = false;
        state = undefined;
    },
})


export const updatePasswordReducer = createReducer(initialState,{
    UpdatePasswordRequest: (state)=>{
        state.loading = true;
    }
    ,
    UpdatePasswordSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    }
    ,
    UpdatePasswordFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state)=>{
        state.error = null;
    },
    clearMessage: (state)=>{
        state.message = null;
    },
    clearUser: (state)=>{
        state.error = null;
        state.user = null;
        state.isAuthenticate = false;
        state = undefined;
    },
})

export const deleteProfileReducer = createReducer(initialState,{
    DeleteProfileRequest: (state)=>{
        state.loading = true;
    },
    DeleteProfileSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    DeleteProfileFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearUser: (state)=>{
        state.error = null;
        state.user = null;
        state.isAuthenticate = false;
        state = undefined;
    },
})


export const verifyEmailReducer = createReducer(initialState,{
    VerifyEmailRequest: (state)=>{
        state.loading = true;
    },
    VerifyEmailSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    VerifyEmailFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    }
    ,
    clearError: (state)=>{
        state.error = null;
    },
    clearMessage: (state)=>{
        state.message = null;
    },
    clearUser: (state)=>{
        state.error = null;
        state.user = null;
        state.isAuthenticate = false;
        state = undefined;
    },
})

export const getAllFacultyReducer = createReducer(initialState,{
    GetAllFacultyRequest: (state)=>{
        state.loading = true;
    },
    GetAllFacultySuccess: (state, action)=>{
        state.loading = false;
        state.faculties = action.payload;
    },
    GetAllFacultyFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearUser: (state)=>{
        state.error = null;
        state.user = null;
        state.isAuthenticate = false;
        state = undefined;
    },
})