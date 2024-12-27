import { useEffect, useState } from "react";

const GetAllStudents = () => {
  const [students, setStudents] = useState([]); // Initialize with an empty array
  useEffect(() => {
    fetch(`http://localhost:3000/api/get-students`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data); // Update the state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);
  return (
    <div>
      <h2>all students</h2>
      {
        students.data?.map(student=> (
            <div>
                <p>{student.name}</p>
                <p>{student.email}</p>
                {/* <img src={`${student.photo}`} alt="" /> */}
            </div>
        ))
      }
    </div>
  );
};

export default GetAllStudents;
