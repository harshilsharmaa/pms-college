import React, { useState } from 'react'
import './Publications.css'
import { useSelector } from 'react-redux';
import DeletePublication from '../DeletePublication/DeletePublication';
import EditPublication from '../EditPublication/EditPublication';
import jsPDF from 'jspdf'
import { Link } from "react-router-dom";

const Publications = ({ publications }) => {

    const {user} = useSelector(state => state.user);
    const { loading:deletePublicationLoading, error:deletePublicationError, message:deletePublicationMessage } = useSelector(state => state.deletePublication)


    const handelDelete = (e,publicationId) => {
        e.preventDefault();
        console.log(publicationId)

    }

    const generatePDF = async() => {
        var doc = new jsPDF('l','mm',[750, 1500]);
    
        doc.html(document.getElementById('publications'), {
          callback: function (pdf) {
            pdf.save('test.pdf');
          }
        });
      }
    
      const deleteClick = (e,publicationId) => {
        e.preventDefault();
        console.log(publicationId)
      }

    return (
        <>


            <div className='table-box' id='publications'>
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col"></th>
                            <th scope="col">Title of Paper</th>
                            <th scope="col">Author</th>
                            <th scope="col">Department</th>
                            <th scope="col">Name of Journal</th>
                            <th scope="col">Year of publication</th>
                            <th scope="col">ISSN number</th>
                            <th scope="col">Journal Link</th>
                            <th scope="col">Artical Link</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            publications && user ? publications.map((publication, index) => (
                                    <tr key={publication._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            {
                                                publication.author._id == user._id ?
                                            
                                                
                                                    <div>


                                                       <div className=" pr-4 bd-highlight">
                                                            {/* <button type='button' className="btn text-primary" data-bs-toggle="modal" data-bs-target="#editPublicationModal" title="Edit this publication"></button> */}
                                                            {/* <a title="Edit this publication" href={`/edit/publication/${publication._id}`}></a> */}
                                                            <Link to={`/edit/publication/${publication._id}`}><i className="bi bi-pencil-square" ></i></Link>
                                                            
                                                            <div className="px-1 bd-highlight">
{/*         
                                                                <button  className="btn bi bi-trash-fill" data-bs-toggle="modal" data-bs-target="#deletePublicationModel" style={{ color: "red" }} title="Delete this publication"></button> */}
                                                            </div>
                                                        </div>
                                                    </div> : null
                                            }
                                        </td>
                                        <td>{publication.title}</td>
                                        <td>{publication.author.name}</td>
                                        <td>{publication.author.department}</td>
                                        <td>{publication.journalName}</td>
                                        <td>{publication.yearOfPublication}</td>
                                        <td>{publication.issnNumber}</td>
                                        <td><a href={publication.journalLink} target="_blank">Link</a></td>
                                        <td><a href={publication.articalLink} target="_blank">Link</a> </td>
                                    </tr>
                            )):null
                        }
                    </tbody>
                    {/* <button onClick={generatePDF}>PDF</button> */}
                </table>
            </div>
        </>
    )
}

export default Publications