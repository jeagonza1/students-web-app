import { useQuery, gql } from '@apollo/client';

const GET_STUDENTS = gql`
query GetStudents {
  students {
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
  `

export const useStudents = () => {
  const { error, loading, data } = useQuery(GET_STUDENTS);
  return {
    error,
    data,
    loading
  }
}