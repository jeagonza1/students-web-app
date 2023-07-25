import { useQuery, gql } from '@apollo/client';

const GET_STUDENT = gql`
query GetStudent($id: Int!){
  student(id: $id) {
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
export const useStudent = (id) => {
  const { error, loading, data } = useQuery(GET_STUDENT, {
    variables: {
      id
    }
  });
  return {
    error,
    data,
    loading
  }
}