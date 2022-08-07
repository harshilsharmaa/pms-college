import React from 'react';
import { Link, } from 'react-router-dom'
import { logout } from '../../Actions/user'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from "@material-ui/core/Avatar";
const Navbar = () => {

    const { user} = useSelector(state => state.user);


    const dispatch = useDispatch()

    const handleClick = async () => {
        await dispatch(logout());
        window.location.href = '/signup'
        dispatch({ type: "clearUser" });
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#1f3c44" }}>
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand border rounded p-1 shadow">Publications Management System</Link>
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
                    <div>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Settings</a>
                            </li> */}

                            <li className="nav-item dropdown mr-0 mx-5">


                                    <Link to='/profile' title="Profile">
                                    <Avatar

                                        alt="Profile"
                                        src="/broken-image.jpg"
                                        >
                                    </Avatar>

                                </Link>
                            </li>
                            <li className="nav-item dropdown mr-0">

                                <button title='Logout' onClick={handleClick} className="logout-btn  bi bi-arrow-right"></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar
