import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { register } from '../../Actions/user.js'
import { Link } from 'react-router-dom'
// import "./Signup.css"


const Signup = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  const {isAuthenticate} = useSelector((state)=>state.user);
  const {loading, error, isAuthenticate:registerUserAuthenticated} = useSelector((state)=>state.registerUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, department));
  }

  useEffect(() => {
    if(isAuthenticate || registerUserAuthenticated){
        window.location.href = '/'
    }
  },[isAuthenticate, registerUserAuthenticated]);

  return (<>


  <div className="container-fluid">
    <div className="row justify-content-center align-items-center" style={{height:"90vh"}}>
      <div className="col-10 col-lg-6 border shadow rounded p-2">
          <h3 className="fw-bold mb-2 mt-2 text-uppercase text-center">Publication Managment System</h3>
     
          
              <h5 className="mb-4 text-center">Signup Here</h5>
            

              {/* <div className='login'> */}
                <form action="" onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                  <input  className="form-control rounded-5" id="floatingInput1"  value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder='Enter Name' required />
                  <label htmlFor="floatingInput1">Name</label>
                 </div>
                <div className="form-floating mb-3 ">
                  <input  className="form-control rounded-5" id="floatingInput" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Email' required />
                  <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                  <input  className="form-control rounded-5" id="floatingInput1"  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Password' required />
                  <label htmlFor="floatingInput1">Password</label>
                 </div>
                  <div className="form-floating mb-3">
                  <input  className="form-control rounded-5" id="floatingInput1"  value={department} onChange={(e) => setDepartment(e.target.value)} type="text" placeholder='Enter Department, Ex: IT' required />
                  <label htmlFor="floatingInput1">Department</label>
                 </div>
                  <button disabled={loading} className='btn btn-primary px-5'>Signup</button>
                 
                  <Link className='mx-5  text-secondary' to="/">Aleready have account? Login</Link>
                  <p className='m-2 text-danger'>{error}</p>
                </form>
              </div>
              </div>
              </div>

            
  </>
  )
}

export default Signup