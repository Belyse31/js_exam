import Forms from "./components/forms";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateUser from "./components/updates";
import FullInfo from "./components/fullInfo";
function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Forms />} />
          <Route path="/all" element={<FullInfo />} />
          <Route element={<UpdateUser />} path="/update/:id" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
