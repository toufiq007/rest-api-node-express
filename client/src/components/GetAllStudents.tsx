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
  console.log(students);
  return (
    <div>
      <h2>all students</h2>
      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
      {students.data?.map((student) => (
        <div>
          <img
            src={`http://localhost:3000/${student.photo}`}
            width={300}
            height={300}
            style={{ objectFit: "cover" }}
            alt=""
          />
        </div>
      ))}
      </div>
    </div>
  );
};

export default GetAllStudents;
