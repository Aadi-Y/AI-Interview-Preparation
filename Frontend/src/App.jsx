import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SignUp from "./Auth/SignUp/SignUp";
import Login from "./Auth/Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import InterviewPrep from "./InterviewPrep/InterviewPrep";
import Landing from "./Landing/Landing";
import Modals from "./Modal/Modals";
import PreviewUrl from "./PhotoPreview/Preview"
import UserProvider from "./Context/UserProvider";
import { Toaster } from "react-hot-toast";


function App() {
  

  return (
    <>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/" element={<Landing/>}></Route>
          <Route path="/interview-prep/:sessionId" element={<InterviewPrep/>}></Route>
          <Route path="/modal" element={<Modals/>}></Route>
          <Route path="/previewUrl" element={<PreviewUrl/>} ></Route>
          <Route path="user" element={<UserProvider/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
