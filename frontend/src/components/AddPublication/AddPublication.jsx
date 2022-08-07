import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addPublication, getMyPublications } from '../../Actions/publications'

const AddPublication = () => {

    const dispatch = useDispatch();

    const { loading, error, message } = useSelector(state => state.addPublication)


    useEffect(() => {

        if(message){
            dispatch(getMyPublications());
            document.getElementById("addPublicationForm").reset();
        }

        setTimeout(() => {
            dispatch({ type: "clearMessage" })
            dispatch({ type: "clearError" })
        }, 9000)


    }, [message, error])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {}
        for (let name of formData.keys()) {
            data[name] = formData.get(name)
        }
        dispatch(addPublication(data));
        console.log(data)
    }


    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Publication</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id='addPublicationForm' onSubmit={handleSubmit}>
                                <input disabled={true} type="hidden" name="userId" required={true} />
                                <div class="form-group row">
                                    <label>
                                        Title:
                                        <textarea name="title" id="title" className="form-control mx-1" type="text" placeholder='Title of Paper' required={true} />
                                    </label>
                                </div>
                                <div class="form-group row">
                                    <label>
                                        Department:
                                        <input name="department" className="form-control mx-1" type="text" placeholder='Ex: IT' required={true} />
                                    </label>
                                </div>
                                <div class="form-group row">
                                    <label>
                                        Journal Name:
                                        <input name="journalName" className="form-control mx-1" type="text" placeholder='Name of Journal' required={true} />
                                    </label>
                                </div>
                                <div class="form-group row">
                                    <label>
                                        Year Of Publication:
                                        <input name="yearOfPublication" className="form-control mx-1" type="number" placeholder='YYYY' required={true} />
                                    </label>
                                </div>
                                <div class="form-group row">
                                    <label>
                                        ISSN Number:
                                        <input name="issnNumber" className="form-control mx-1" type="number" placeholder='ISSN Number' />
                                    </label>
                                </div>

                                <div class="form-group row">
                                    <label>
                                        Journal Link:
                                        <input name="journalLink" className="form-control mx-1" type="text" placeholder='Link to website of the Journal' />
                                    </label>
                                </div>
                                <div class="form-group row">
                                    <label>
                                        Artical Link:
                                        <input name="articalLink" className="form-control mx-1" type="text" placeholder='Link to website of the Journal' />
                                    </label>
                                </div>
                                <p className='m-2 text-danger'>{error}</p>
                                <p className='m-2 text-success'>{message}</p>
                                <br />
                                <div className="modal-footer mt-2">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button disabled={loading} type="submit" className="btn btn-primary px-5">{loading ? "Adding..." : "Add"}</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default AddPublication