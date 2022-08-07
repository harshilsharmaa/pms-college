import React,{useEffect} from 'react';
import './App.css';
import {useSelector, useDispatch} from 'react-redux'
import { loadUser } from './Actions/user.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Signup from './components/Signup/Signup';
import EditPublication from './components/EditPublication/EditPublication';
import NotFound from './components/NotFound/NotFound';

function App() {

  const dispatch = useDispatch()

  
  useEffect(() => {
    dispatch(loadUser())
  },[dispatch])
  const {isAuthenticate} = useSelector(state=>state.user)

  return (

    <React.StrictMode>
    <Router>

      <Routes>

        <Route exact path='/' element={isAuthenticate?<Home />:<Login/>}></Route>
        {/* <Route path='/home' element={<Home />}></Route> */}
        <Route exact path='/profile' element={isAuthenticate?<Profile />:<Login/>}></Route>
        <Route exact path='/signup' element={<Signup/>}></Route>
        <Route  path='/edit/publication/:id' element={isAuthenticate?<EditPublication />:<Login/>}></Route>
         <Route path='*' element={<NotFound/>}></Route>


      </Routes>

    </Router>
    </React.StrictMode>
  );
}

export default App;
