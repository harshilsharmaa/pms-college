import {configureStore} from '@reduxjs/toolkit'

import {
    userReducer,
    registerUserReducer,
    updateProfileReducer,
    updatePasswordReducer,
    getAllFacultyReducer,
    deleteProfileReducer
} from './Reducers/user'

import {
    publicationsReducer,
    addPublicationReducer,
    deletePublicationReducer,
    editPublicationReducer,
    getPublicationByIdReducer,
} from './Reducers/publications'

const store = configureStore({
    reducer:{
        user: userReducer,
        registerUser: registerUserReducer,
        updateProfile: updateProfileReducer,
        updatePassword: updatePasswordReducer,
        faculties: getAllFacultyReducer,
        deleteProfile: deleteProfileReducer,
        // ---------------------------------
        publications: publicationsReducer,
        addPublication: addPublicationReducer,
        deletePublication: deletePublicationReducer,
        editPublication: editPublicationReducer,
        publicationById: getPublicationByIdReducer,
    },
})

export default store;