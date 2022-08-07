import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editPublication, getMyPublications, getPublicationById,deletePublication } from '../../Actions/publications'
import { loadUser } from '../../Actions/user'
import {useParams} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './EditPublication.css'

const EditPublication = ({history}) => {

    const {id} = useParams();

    const {loading:userLoading} = useSelector(state => state.user);
    const {publicationById, loading:publicationLoading} = useSelector(state => state.publicationById);
    const { loading:deletePublicationLoading, error:deletePublicationError, message:deletePublicationMessage } = useSelector(state => state.deletePublication)
    const { loading, error, message } = useSelector(state => state.editPublication)

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(loadUser());
    // },[])

    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [journalName, setJournalName] = useState("");
    const [issnNumber, setIssnNumber] = useState("");
    const [yearOfPublication, setYearOfPublication] = useState("");
    const [journalLink, setJournalLink] = useState("");
    const [articalLink, setArticalLink] = useState("");

    useEffect(() => {
        dispatch(getPublicationById(id));
    },[id]);

    useEffect(() => {
        if(publicationById){
            

            setTitle(publicationById.title);
            setDepartment(publicationById.author.department);
            setJournalName(publicationById.journalName);
            setIssnNumber(publicationById.issnNumber);
            setYearOfPublication(publicationById.yearOfPublication);
            setJournalLink(publicationById.journalLink);
            setArticalLink(publicationById.articalLink);
        }
        
    },[publicationById])


    useEffect(() => {

        if(message || deletePublicationMessage){
            dispatch(getMyPublications());
            window.location.href = '/';
            console.log(message)
            setTimeout(() => {
                dispatch({ type: "clearMessage" })
                dispatch({ type: "clearError" })
            }, 4000)
        }

        if(error || deletePublicationError){
            setTimeout(() => {
                dispatch({ type: "clearMessage" })
                dispatch({ type: "clearError" })
            }, 4000)
        }


    }, [message, deletePublicationMessage, error, deletePublicationError])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {}
        for (let name of formData.keys()) {
            data[name] = formData.get(name)
        }
        dispatch(editPublication(id, data));
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        if(window.confirm('Are you sure you want to delete this publication?')){
            dispatch(deletePublication(id));
        }
    }


    return (
        <>
        <Navbar />


            {
                publicationLoading || deletePublicationLoading || userLoading? <div style={{width: "5rem", height: "5rem"}}  className="spinner-border text-primary center " role="status" /> :
            

            <div >
                <div className="editPublication">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Publication</h5>
                    </div>
                    <div className="modal-body">
                        {
                            loading ? <div style={{width: "5rem", height: "5rem"}}  className="spinner-border text-primary center " role="status" /> : 
                            <form id='editPublicationForm' onSubmit={handleSubmit}>
                            <input disabled={true} type="hidden" name="userId" required={true} />
                            <div class="form-group row">
                                <label>
                                    Title:
                                    <textarea value={title} onChange={(e)=>setTitle(e.target.value)} name="title" id="title" className="form-control mx-1" type="text" placeholder='Title of Paper' required={true} />
                                </label>
                            </div>
                            <div class="form-group row">
                                <label>
                                    Department:
                                    <input value={department} onChange={(e)=>setDepartment(e.target.value)} name="department" className="form-control mx-1" type="text" placeholder='Ex: IT' required={true} />
                                </label>
                            </div>
                            <div class="form-group row">
                                <label>
                                    Journal Name:
                                    <input value={journalName} onChange={(e)=>setJournalName(e.target.value)} name="journalName" className="form-control mx-1" type="text" placeholder='Name of Journal' required={true} />
                                </label>
                            </div>
                            <div class="form-group row">
                                <label>
                                    Year Of Publication:
                                    <input value={yearOfPublication} onChange={(e)=>setYearOfPublication(e.target.value)} name="yearOfPublication" className="form-control mx-1" type="number" placeholder='YYYY' required={true} />
                                </label>
                            </div>
                            <div class="form-group row">
                                <label>
                                    ISSN Number:
                                    <input value={issnNumber} onChange={(e)=>setIssnNumber(e.target.value)} name="issnNumber" className="form-control mx-1" type="number" placeholder='ISSN Number' />
                                </label>
                            </div>
                            <div class="form-group row">
                                <label>
                                    Journal Link:
                                    <input value={journalLink} onChange={(e)=>setJournalLink(e.target.value)} name="journalLink" className="form-control mx-1" type="text" placeholder='Link to website of the Journal' />
                                </label>
                            </div>
                            <div class="form-group row">
                                <label>
                                    Artical Link:
                                    <input value={articalLink} onChange={(e)=>setArticalLink(e.target.value)} name="articalLink" className="form-control mx-1" type="text" placeholder='Link to Artical' />
                                </label>
                            </div>
                            <p className='m-2 text-danger'>{error}</p>
                            <p className='m-2 text-success'>{message}</p>
                            <br />
                            <div className="modal-footer mt-2">
                                <button onClick={()=>window.location.href = "/"}  type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button disabled={loading} type="submit" className="btn btn-primary px-5">{loading ? "Updating..." : "Update"}</button>
                                <button onClick={handleDelete} disabled={loading || deletePublicationLoading} type="submit" className="btn btn-danger px-5">{deletePublicationLoading?"Deleting...":"Delete"}</button>
                            </div>
                        </form>}
                    </div>

                </div>
            </div>
            }
        </>

    )
}

export default EditPublication