import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useStudent } from "../hooks/useStudent";

const UPDATE_STUDENT = gql`
  mutation UpdateStudent($firstname: String!,$lastname: String!, $email: String!, $street: String!, $city: String!, $id: Int!) {
    updateStudent(createStudentRequest : {
      firstName:$firstname
      lastName: $lastname
      email:$email
      street:$street
      city :$city
     },id: $id) {
      id
      firstName
      lastName
      email
      street
      city
     
    }
  }
  `;
export default function Student() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { error, loading, data } = useStudent(id);

    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState();
    const [street, setStreet] = useState();
    const [city, setCity] = useState();

    useEffect(() => {
        if (data?.student) {
            setFirstname(data.student.firstName);
            setLastname(data.student.lastName);
            setEmail(data.student.email);
            setStreet(data.student.street);
            setCity(data.student.city);
        }
    }, [data]);

    const [updateStudent] = useMutation(UPDATE_STUDENT, {
        onCompleted: (data) => {
            navigate('/');
        },
        onError: (error) => {
            console.error('Error update student:', error);
        },
        refetchQueries: ['GetStudents'],
    });

    const handleUpdateStudent = (event) => {
        event.preventDefault();
        console.log('Adding student:', {
            firstname,
            lastname,
            email,
            street,
            city,
            id,
        });

        updateStudent({
            variables: {
                firstname,
                lastname,
                email,
                street,
                city,
                id,
            },
        });
    };

    if (error) return <div>something went wrong...</div>
    if (loading) return <div>spinner...</div>
    if (data) {
        return (
            <div>
                <br /><br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h2 className="text-center">Update Student</h2>
                            <div className="card-body">
                                <form onSubmit={handleUpdateStudent}>
                                    <div className="form-group mb-2">
                                        <label className="form-label"> First Name :</label>
                                        <input
                                            type="text"
                                            placeholder="Enter first name"
                                            name="firstname"
                                            className="form-control"
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                        >
                                        </input>
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="form-label"> Last Name :</label>
                                        <input
                                            type="text"
                                            placeholder="Enter last name"
                                            name="lastname"
                                            className="form-control"
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                        >
                                        </input>
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="form-label"> Email:</label>
                                        <input
                                            type="text"
                                            placeholder="Enter email "
                                            name="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)}
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
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}

                                        >
                                        </input>
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                    <Link style={{ marginLeft: "10px" }} to="/" className="btn btn-danger"> Cancel </Link>
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