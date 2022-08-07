import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { login, loadUser } from '../../Actions/user.js'
import { Link } from 'react-router-dom'



const Login = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {error, loading} = useSelector(state => state.user)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    dispatch(loadUser());
  }

  return (<>


  <div className="container-fluid">
    <div className="row justify-content-center align-items-center" style={{height:"90vh"}}>
      <div className="col-10 col-lg-6 border shadow rounded p-2">
          <h3 className="fw-bold mb-2 mt-2 text-uppercase text-center">Publications Management System</h3>
     
          
              <h5 className="mb-4 text-center">Login Here</h5>
            

              {/* <div className='login'> */}
                <form action="" onSubmit={handleSubmit}>
                <div className="form-floating mb-3 ">
                  <input  className="form-control rounded-5" id="floatingInput" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Email' required />
                  <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                  <input  className="form-control rounded-5" id="floatingInput1"  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Password' required />
                  <label htmlFor="floatingInput1">Password</label>
                 </div>
                  <button disabled={loading} className='btn btn-primary px-3 mx-3 my-1'>Login</button>
                 
                  <Link className='mx-3  text-secondary' to="/signup">Not Registered? Signup</Link>
                  <p className='m-2 text-danger'>{error}</p>
                </form>
              </div>
              </div>
              </div>

            
  </>
  )
}

export default Login
