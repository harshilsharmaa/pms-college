import axios from "axios" 

const rootUrl = ""

export const getAllPublications = ()=> async(dispatch)=>{
    try{
        dispatch({
            type:"GetAllPublicationsRequest"
        })
        const {data} = await axios.get(`${rootUrl}/api/v1/all-publications`);
        dispatch({
            type:"GetAllPublicationsSuccess",
            payload:data.publications
        })
    }
    catch(error){
        dispatch({
            type:"GetAllPublicationsFailure",
            payload:error.response.data.message
        })
    }
}

export const getMyPublications= ()=> async(dispatch)=>{
    try {

        dispatch({
            type:"MyPublicationRequest"
        })

        const {data} = await axios.get(`${rootUrl}/api/v1/user/my/publications`)

        dispatch({
            type:"MyPublicationSuccess",
            payload:data.publications
        })


    } catch (error) {
        dispatch({
            type:"MyPublicationFailure",
            payload:error.response.data.message
        })
    }
}

export const addPublication = (publication)=> async(dispatch)=>{
    try {

        dispatch({
            type:"AddPublicationRequest"
        })

        const {data} = await axios.post(`${rootUrl}/api/v1/user/add/publication`,publication)

        dispatch({
            type:"AddPublicationSuccess",
            payload:data.message
        })
    }
    catch (error) {
        dispatch({
            type:"AddPublicationFailure",
            payload:error.response.data.message
        })
    }
}

export const deletePublication = (id)=> async(dispatch)=>{
    try {
        dispatch({
            type:"DeletePublicationRequest"
        })

        const {data} = await axios.delete(`${rootUrl}/api/v1/user/delete/publication/${id}`)

        dispatch({
            type:"DeletePublicationSuccess",
            payload:data.message
        })
    }
    catch (error) {
        dispatch({
            type:"DeletePublicationFailure",
            payload:error.response.data.message
        })
    }
}

export const editPublication = (id,publication)=> async(dispatch)=>{
    try {
        dispatch({
            type:"EditPublicationRequest"
        })

        const {data} = await axios.put(`${rootUrl}/api/v1/user/edit/publication/${id}`,publication)

        dispatch({
            type:"EditPublicationSuccess",
            payload:data.message
        })
    }
    catch (error) {
        dispatch({
            type:"EditPublicationFailure",
            payload:error.response.data.message
        })
    }
}

export const getPublicationById = (id)=> async(dispatch)=>{
    try {
        dispatch({
            type:"GetPublicationByIdRequest"
        })

        const {data} = await axios.get(`${rootUrl}/api/v1/user/publication/${id}`)

        dispatch({
            type:"GetPublicationByIdSuccess",
            payload:data.publication
        })
    }
    catch (error) {
        dispatch({
            type:"GetPublicationByIdFailure",
            payload:error.response.data.message
        })
    }
}