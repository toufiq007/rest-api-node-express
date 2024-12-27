import "./App.css";
import GetAllStudents from "./components/GetAllStudents";
import RegisterUser from "./components/RegisterUser";

function App() {
  return (
    <>
      <h2>Learning rest api with node express and mongodb</h2>
      <RegisterUser/>
      <GetAllStudents />
    </>
  );
}

export default App;
