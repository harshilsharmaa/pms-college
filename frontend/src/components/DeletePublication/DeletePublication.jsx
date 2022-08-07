import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deletePublication, getMyPublications } from '../../Actions/publications'

const DeletePublication = ({publicationId}) => {

    

    const dispatch = useDispatch();

    const { loading:deletePublicationLoading, error:deletePublicationError, message:deletePublicationMessage } = useSelector(state => state.deletePublication)


    useEffect(() => {

        if(deletePublicationMessage){
            dispatch(getMyPublications());
            console.log(deletePublicationMessage)
        }

        dispatch({ type: "clearMessage" })
        dispatch({ type: "clearError" })
        // setTimeout(() => {
        // }, 5000)


    }, [deletePublicationMessage, deletePublicationError])

    const handleDelete = async (e) => {
        e.preventDefault()
        console.log(publicationId);
        // dispatch(deletePublication(publicationId));
    }


    return (
        <>
            <div className="modal fade" id="deletePublicationModel" tabIndex="-1" aria-labelledby="deletePublicationModel" aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                            {
                                !deletePublicationMessage? <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to delete this Publication</h5>:null
                                // <h5 className="modal-title" id="exampleModalLabel">Publication Deleted successfully</h5>
                            }
                            
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                                <p className='m-2 text-danger'>{deletePublicationError}</p>
                                <p className='m-2 text-success'>{deletePublicationMessage}</p>
                            {
 
                                <div>

                                <button disabled={deletePublicationLoading} data-bs-dismiss="modal" onClick={handleDelete} type="submit" className="btn btn-danger px-5">{deletePublicationLoading?"Deleting..":"Delete"}</button>
                                <button disabled={deletePublicationLoading} type="button" className="btn btn-secondary mx-3" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default DeletePublication