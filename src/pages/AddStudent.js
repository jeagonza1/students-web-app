import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const CREATE_STUDENT = gql`
  mutation CreateStudent($firstname: String!,$lastname: String!, $email: String!, $street: String!, $city: String!) {
  createStudent(createStudentRequest : {
    firstName:$firstname
    lastName: $lastname
    email:$email
    street:$street
    city : $city
    subjectsLearning : [
      {
        subjectName: "Java"
        marksObtained:  80 
      },
      {
        subjectName: "MySql"
        marksObtained:  60 
      }
    ]
  }) {
    id
    firstName
    lastName
    email
    street
    city
    learningSubjects(subjectNameFilter: All) {
      id
      subjectName
      marksObtained
    }
  }
}
`;


export default function Student() {
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');

    const [addStudent] = useMutation(CREATE_STUDENT, {
        onCompleted: (data) => {
            navigate('/'); // Redirige a la página de la lista de estudiantes
        },
        onError: (error) => {
            console.error('Error create student:', error);
        },
        refetchQueries: ['GetStudents'], // Recarga la lista de estudiantes después de crear uno
    });

    const handleAddStudent = (event) => {
        event.preventDefault();
        console.log('Adding student:', {
            firstname,
            lastname,
            email,
            street,
            city,
        });

        addStudent({
            variables: {
                firstname,
                lastname,
                email,
                street,
                city,
            },
        });
    };

    return (
        <div>
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className="text-center">Add Student</h2>
                        <div className="card-body">
                            <form onSubmit={handleAddStudent}>
                                <div className="form-group mb-2">
                                    <label className="form-label"> First Name :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter first name"
                                        name="firstName"
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
                                        name="lastName"
                                        className="form-control"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Email:</label>
                                    <input
                                        type="email"
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
                                        type="street"
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
                                        type="city"
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