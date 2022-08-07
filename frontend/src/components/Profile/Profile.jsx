import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { updateMyProfile, updateMyPassword, deleteMyProfile, loadUser } from '../../Actions/user';
import './Profile.css'

const Profile = () => {

  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.user);

  const { updateProfile, message:updateProfileMessage, error:updateProfileError, loading: loadingUpdateProfile } = useSelector(state => state.updateProfile);
  const { updatePassword, message:updatePasswordMessage, error:updatePasswordError, loading: loadingUpdatePassword } = useSelector(state => state.updatePassword);
  const {deleteProfile, message: deleteMyProfileMessage, error: deleteMyProfileError, loading: loadingDeleteMyProfile } = useSelector(state => state.deleteProfile);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');


  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    dispatch(loadUser());
  },[])


  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setDepartment(user.department);
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMyProfile(name, email, department));
  }

  const handleDelete = (e) => {
    e.preventDefault();
    
    if(window.confirm('Are you sure you want to delete your account?')){
      dispatch(deleteMyProfile());
    }
  }

  useEffect(() => {
    if (updateProfileMessage || updateProfileError || updatePasswordMessage || updatePasswordError || deleteMyProfileError) {
      document.getElementById('updatePasswordForm').reset();
      setTimeout(() => {
        dispatch({ type: "clearMessage" });
        dispatch({ type: "clearError" });
      }, 4000);
    }
    if(deleteMyProfileMessage){

      window.location.href = '/signup';
      dispatch({ type: "clearUser" });
      dispatch(loadUser())
    }
  }, [updateProfileMessage, updateProfileError, updatePasswordMessage, updatePasswordError, deleteMyProfileError, deleteMyProfileMessage])

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('Password does not match');
      return;
    }
    setPasswordError('');
    dispatch(updateMyPassword(oldPassword, newPassword));
  }

  return (
    <>

      <Navbar />

      {
        loading ? <div style={{width: "5rem", height: "5rem"}}  className="spinner-border text-primary center " role="status" /> :
      

      <div className="container-fluid">
        <div className="row justify-content-center align-items-center" style={{ height: "90vh" }}>
          <h3 className="fw-bold mb-1 mt-1 text-uppercase text-center">Publications Management System</h3>

          <div className="col-10 col-lg-5 border shadow rounded p-2 mx-3">
            <h5 className="mb-4 text-center">Update Profile</h5>
                <form action="" >
                  <div className="form-floating mb-3">
                    <input className="form-control rounded-5" id="floatingInput1" value={email} onChange={(e) => setEmail(e.target.value)} type="name" placeholder='Enter Name' required />
                    <label htmlFor="floatingInput1">Email </label>

                  </div>
                  <div className="form-floating mb-3 ">
                    <input className="form-control rounded-5" id="floatingInput" value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder='Enter Email' required />
                    <label htmlFor="floatingInput">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input className="form-control rounded-5" id="floatingInput1" value={department} onChange={(e) => setDepartment(e.target.value)} type="name" placeholder='Company' required />
                    <label htmlFor="floatingInput1">Deaprtment</label>
                  </div>
                  <button onClick={handleSubmit} className='btn btn-primary px-5'>Update</button>
                  <button onClick={handleDelete} className='btn btn-danger px-4 mx-5'>Delete Account</button>
                  <h5 className='m-0 text-danger'>{updateProfileError}</h5>
                  <h5 className='m-0 text-danger'>{deleteMyProfileError}</h5>
                  <h5 className='m-0 text-success'>{updateProfileMessage}</h5>
                </form>
          </div>


          <div className="col-10 col-lg-5 border shadow rounded p-2 mx-3">


            <h5 className="mb-4 text-center">Update Password</h5>


            {/* <div className='login'> */}
            <form id="updatePasswordForm" action="" onSubmit={handleUpdatePassword}>
              <div className="form-floating mb-3">
                <input className="form-control rounded-5" id="floatingInput1" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" placeholder='Current Password' required />
                <label htmlFor="floatingInput1">Current Password</label>
              </div>
              <div className="form-floating mb-3 ">
                <input className="form-control rounded-5" id="floatingInput" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder='Enter New Password' required />
                <label htmlFor="floatingInput">New Password</label>
              </div>
              <div className="form-floating mb-3">
                <input className="form-control rounded-5" id="floatingInput1" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='Confirm New Password' required />
                <label htmlFor="floatingInput1">Confirm New Password</label>
              </div>
              <button className='btn btn-primary px-5'>Update</button>
              <h4 className='m-0 text-danger'>{passwordError}</h4>
              <h5 className='m-0 text-danger'>{updatePasswordError}</h5>
              <h5 className='m-0 text-success'>{updatePasswordMessage}</h5>
            </form>
          </div>
        </div>
      </div>
}
    </>
  )
}
  export default Profile