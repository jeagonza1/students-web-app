import React from 'react';
import { useStudent } from "../hooks/useStudent";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';


const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: Int!){
    deleteStudent(id: $id)
  }
`;


export default function Student() {
    const [data1, setData1] = useState();
    const { id } = useParams();
    const { error, loading, data } = useStudent(id);
    const navigate = useNavigate();

    const [deleteStudent] = useMutation(DELETE_STUDENT, {
        // after the mutation reload students
        refetchQueries: ['GetStudents'],
    });

    const handleDelete = () => {
        deleteStudent({ variables: { id } })
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Error delete the student:', error);
            });
    }
    const handleInputChange = (event) => {
        // Update the state with the new input value
        const { name, value } = event.target;
        setData1((prevData) => ({
            ...prevData,
            student: {
                ...prevData.student,
                [name]: value,
            },
        }));
    };

    if (data) {
        if (error) return <div>something went wrong...</div>
        if (loading) return <div>spinner...</div>
        return (
            <div>
                <br /><br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h2 className="text-center">Details Student</h2>
                            <div className="card-body">
                                <form>
                                    <div className="form-group mb-2">
                                        <label className="form-label"> First Name :</label>
                                        <input
                                            type="text"
                                            placeholder="Enter first name"
                                            name="firstName"
                                            className="form-control"
                                            value={data.student.firstName}
                                            onChange={handleInputChange}
                                        >
                                        </input>
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="form-label"> Last Name :</label>
                                        <input
                                            type="text"
                                            placeholder="Enter last name"
                                            name="lastName"
                                            className="form-control"
                                            value={data.student.lastName}
                                            onChange={handleInputChange}
                                        >
                                        </input>
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="form-label"> Email:</label>
                                        <input
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            className="form-control"
                                            value={data.student.email}
                                            onChange={handleInputChange}
                                        >
                                        </input>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label"> Street:</label>
                                        <input
                                            type="text"
                                            placeholder="Enter street"
                                            name="street"
                                            className="form-control"
                                            value={data.student.street}
                                            onChange={handleInputChange}
                                        >
                                        </input>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label"> City:</label>
                                        <input
                                            type="text"
                                            placeholder="Enter city"
                                            name="city"
                                            className="form-control"
                                            value={data.student.city}
                                            onChange={handleInputChange}
                                        >
                                        </input>
                                    </div>
                                    <Link to="/" className="btn btn-success" onClick={handleDelete}> Delete </Link>
                                    <Link style={{ marginLeft: "10px" }} to="/" className="btn btn-danger"> Back </Link>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
    return null;
}