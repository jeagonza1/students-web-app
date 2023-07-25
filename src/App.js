import './App.css';
import StudentList from './pages/StudentList';
import Student from './pages/Student';
import UpdateStudent from './pages/UpdateStudent';
import AddStudent from './pages/AddStudent';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/update-student/:id" element={<UpdateStudent />} />
        <Route path="/details/:id" element={<Student />} />
      </Routes>
    </div>
  );
}

export default App;