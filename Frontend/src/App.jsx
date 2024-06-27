import Form from "./components/form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateUser from "./components/update";
function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route element={<UpdateUser />} path="/update/:id" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
