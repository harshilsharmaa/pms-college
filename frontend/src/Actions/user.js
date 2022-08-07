import axios from "axios" 

const rootUrl = ""

export const login= (email, password)=> async(dispatch)=>{
    try {

        dispatch({
            type:"LoginRequest"
        })

        const {data} = await axios.post(`${rootUrl}/api/v1/user/login`, {email, password},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:"LoginSuccess",
            payload:data.message
        })


    } catch (error) {
        dispatch({
            type:"LoginFailure",
            payload:error.response.data.message
        })
    }
}
export const register = (name, email, password, department)=> async(dispatch)=>{
    try {

        dispatch({
            type:"RegisterRequest"
        })

        const {data} = await axios.post(`${rootUrl}/api/v1/user/register`, {name,email, password, department},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:"RegisterSuccess",
            payload:data.message
        })


    } catch (error) {
        dispatch({
            type:"RegisterFailure",
            payload:error.response.data.message
        })
    }
}


export const loadUser = ()=> async(dispatch)=>{
    try{
        dispatch({
            type:"LoadUserRequest"
        })

        const {data} = await axios.get(`${rootUrl}/api/v1/user/profile`);
        
        dispatch({
            type:"LoadUserSuccess",
            payload:data.user
        })
    }
    catch(error){
        dispatch({
            type:"LoadUserFailure",
            payload:error.response.data.message
        })
    }
}

export const updateMyProfile = (name, email, department)=> async(dispatch)=>{
    try{
        dispatch({
            type:"UpdateProfileRequest"
        })
        const {data} = await axios.put(`${rootUrl}/api/v1/user/profile/update`, {name, email ,department});
        dispatch({
            type:"UpdateProfileSuccess",
            payload:data.message
        })
    }
    catch(error){
        dispatch({
            type:"UpdateProfileFailure",
            payload:error.response.data.message
        })
    }
}

export const requestVerifyEmail = ()=> async(dispatch)=>{
    try{
        dispatch({
            type:"VerifyEmailRequest"
        })
        const {data} = await axios.post(`${rootUrl}/api/v1/user/verifyEmailRequest`);
        dispatch({
            type:"VerifyEmailSuccess",
            payload:data.message
        })
    }
    catch(error){
        dispatch({
            type:"VerifyEmailFailure",
            payload:error.response.data.message
        })
    }
}

export const verifyEmail = (token)=> async(dispatch)=>{
    try{
        dispatch({
            type:"VerifyEmailRequest"
        })
        const {data} = await axios.post(`${rootUrl}/api/v1/user/verifyEmail/${token}`);
        dispatch({
            type:"VerifyEmailSuccess",
            payload:data.message
        })
    }
    catch(error){
        dispatch({
            type:"VerifyEmailFailure",
            payload:error.response.data.message
        })
    }
}

export const updateMyPassword = (oldPassword, newPassword)=> async(dispatch)=>{
    try{
        dispatch({
            type:"UpdatePasswordRequest"
        })

        const {data} = await axios.put(`${rootUrl}/api/v1/user/password/update`, {oldPassword, newPassword});
        dispatch({
            type:"UpdatePasswordSuccess",
            payload:data.message
        })
    }
    catch(error){
        dispatch({
            type:"UpdatePasswordFailure",
            payload:error.response.data.message
        })
    }
}

export const forgotPassword = (email)=> async(dispatch)=>{
    try{
        dispatch({
            type:"ForgotPasswordRequest"
        })

        const {data} = await axios.post(`${rootUrl}/api/v1/user/forgot/password`, {email},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:"ForgotPasswordSuccess",
            payload:data.message
        })
    }
    catch(error){
        dispatch({
            type:"ForgotPasswordFailure",
            payload:error.response.data.message
        })
    }
}

export const deleteMyProfile = ()=> async(dispatch)=>{
    try{
        dispatch({
            type:"DeleteProfileRequest"
        })

        const {data} = await axios.delete(`${rootUrl}/api/v1/user/delete/account`);
        dispatch({
            type:"DeleteProfileSuccess",
            payload:data.message
        })
    }
    catch(error){
        dispatch({
            type:"DeleteProfileFailure",
            payload:error.response.data.message
        })
    }
}

export const resetPassword = (token, password)=> async(dispatch)=>{

    try{
        dispatch({
            type:"ResetPasswordRequest"
        })

        const {data} = await axios.put(`${rootUrl}/api/v1/user/password/reset/${token}`, {token, password},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:"ResetPasswordSuccess",
            payload:data.message
        })
    }
    catch(error){
        dispatch({
            type:"ResetPasswordFailure",
            payload:error.response.data.message
        })
    }

}

export const logout = () =>async(dispatch)=>{

    try{
        dispatch({
            type:"LogoutUserRequest",
        });

        await axios.get(`${rootUrl}/api/v1/user/logout`);

        dispatch({
            type:"LogoutUserSuccess",
        })

    }
    catch(error){
        dispatch({
            type:"LogoutUserFailure",
            payload:error.response.data.message
        })
    }
}

export const getAllFaculty = ()=> async(dispatch)=>{
    try{
        dispatch({
            type:"GetAllFacultyRequest"
        })

        const {data} = await axios.get(`${rootUrl}/api/v1/all-faculty`);
        dispatch({
            type:"GetAllFacultySuccess",
            payload:data.faculty
        })
    }
    catch(error){
        dispatch({
            type:"GetAllFacultyFailure",
            payload:error.response.data.message
        })
    }
}