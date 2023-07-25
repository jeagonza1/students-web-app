import { useStudents } from "../hooks/useStudents";
import { Link } from "react-router-dom";

export default function StudentList() {


    const { error, loading, data } = useStudents();

    if (loading) return <div>spinner...</div>
    if (error) return <div>somethin went wrong...</div>

    return (
        <div className="container">
            <h2 className="text-center"> List Students </h2>
            <Link to="/add-student" className="btn btn-primary mb-2" > Add Student </Link>
            <table className="table table-bordered table-striped">

                <thead>
                    <tr>
                        <th> Student Id </th>
                        <th> Student First Name </th>
                        <th> Student Last Name </th>
                        <th> Student Email </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.students.map(
                            students =>
                                <tr key={students.id}>
                                    <td> {students.id} </td>
                                    <td> {students.firstName} </td>
                                    <td>{students.lastName}</td>
                                    <td>{students.email}</td>
                                    <td>
                                        <Link className="btn btn-success" to={`details/${students.id}`} >Details</Link>
                                        <Link style={{ marginLeft: "10px" }} className="btn btn-info" to={`update-student/${students.id}`} >Update</Link>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )

}