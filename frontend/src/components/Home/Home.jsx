import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Publications from '../Publications/Publications'
import { useSelector, useDispatch } from 'react-redux'
import './Home.css'
import { getMyPublications, getAllPublications } from '../../Actions/publications'
import { getAllFaculty, loadUser } from '../../Actions/user'
import AddPublication from '../AddPublication/AddPublication'

const Home = () => {
  const dispatch = useDispatch();

  const { user, loading: userLoading } = useSelector(state => state.user);

  const { publications, loading } = useSelector(state => state.publications);
  const { faculties, loading: facultiesLoading } = useSelector(state => state.faculties);
  // console.log(publications);


  const [publicationsArr, setPublicationsArr] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    dispatch(loadUser());
  },[dispatch])

  useEffect(() => {
    if(user){
      if (user.isHod == false) {
        dispatch(getMyPublications());
        return;
      }
      else if(user.isHod == true) {
        dispatch(getAllPublications());
        dispatch(getAllFaculty())
        return;
      }
    }
  }, [user]);

  useEffect(() => {

    setPublicationsArr(publications);
    if(publications){
      setPageLoading(false);
    }
  }, [publications]);

  const year = (new Date()).getFullYear();
  const years = Array.from(new Array(50), (val, index) => index - year);

  const [selectedYear, setSelectedYear] = useState("Year");
  const [selectedFaculty, setSelectedFaculty] = useState("Faculty");

  const setSelectedFacultyHandler = (e) => {
    e.preventDefault();
    setSelectedFaculty(e.target.value);
    console.log(e.target.value);
  }

  const clearFilters = () => {
    setSelectedYear("Year");
    setSelectedFaculty("Faculty");
    document.getElementById("search").value = "";
    setPublicationsArr(publications);
  }

  const searchHandler = (e) => {
    e.preventDefault();
    setPublicationsArr(publications.filter(publication=>publication.title.toLowerCase().includes(e.target.value.toLowerCase())));
  }



  useEffect(() => {
    if (selectedYear !== "Year" && selectedFaculty !== "Faculty") {
      setPublicationsArr(publications.filter(publication => publication.yearOfPublication === selectedYear && publication.author.name === selectedFaculty))
    }
    else if (selectedYear !== "Year") {
      setPublicationsArr(publications.filter(publication => publication.yearOfPublication == selectedYear))
    }
    else if (selectedFaculty !== "Faculty") {
      setPublicationsArr(publications.filter(publication => publication.author.name === selectedFaculty))
    }
  }, [selectedYear, selectedFaculty])





  return (
    <>
      <Navbar />
     {  
        pageLoading ? <div style={{width: "5rem", height: "5rem"}}  className="spinner-border text-primary center " role="status" /> : 
        <div>

     <div id="publications" className="d-flex justify-content-between mt-1 mb-1">

        {/* Select Year */}

        <div style={{ display: "flex" }}>
          <div class="dropdown mx-4 my-1">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {selectedYear}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {
                years.map((year, index) => {

                  return <li onClick={(e) => setSelectedYear(e.target.value)} key={`year${index}`} value={-year}>{-year}</li>
                })
              }
            </ul>
          </div>

          {
            user.isHod == true ?
          <div class="dropdown mx-4 my-1">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {selectedFaculty}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
              {
                faculties && faculties.map((faculty, index) => {
                    
                  return <button className='faculty-btn' onClick={(e)=>setSelectedFacultyHandler(e)} value={faculty.name} >{faculty.name}</button>
                })
              }
            </ul>
          </div>:null
          }
          <button onClick={clearFilters} className='clear-filters'>Clear filters</button>

        </div>
        <div className="my-1">
          <input style={{width:"480px"}} id='search' onChange={(e)=>searchHandler(e)} type="text" class="form-control" placeholder='Search Publication' />
        </div>

        <div className='my-1'>

          {
            user.isHod == false ?
              <button type='button' className='btn btn-primary bi bi-plus-circle mx-4' data-bs-toggle="modal" data-bs-target="#exampleModal" > Add Publication</button> : null
          }
          {/* <button  type='button' className='btn btn-primary bi  mx-3'>Export PDF</button>
          <button type='button' className='btn btn-primary bi mx-3'>Export Sheet</button> */}
          <AddPublication />
        </div>
      </div>

      {
        user.isHod == false ?
        <h4 className="fw-bold mb-2 mt-2 text-uppercase text-center">My Publications</h4>:null
      }
      <div className='container-fluid'>

        <div className="row justify-content-start border">
          {
            // loading ? <p>Loading...</p> :
            <div >
              {
                <Publications publications={publicationsArr} />
              }
            </div>
          }
        </div>
      </div>
      </div>
      }
    </>
  )
}
export default Home