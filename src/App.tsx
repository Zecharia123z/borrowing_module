import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./modules/Login";
import Register from "./modules/Register";
import SignedInLayout from "./components/SignedInLayout";
import SignedOutLayout from "./components/SignedOutLayout";
import Dashboard from "./modules/Dashboard";
import Landing from "./modules/Landing";
import Borrowing from "./modules/Borrowing";
import MeetingScheduler from "./modules/MeetingScheduler";
import BulletinBoard from "./modules/BulletinBoard";
import Chatbot from "./modules/Chatbot";
import EventManager from "./modules/EventManager";
import Inventory from "./modules/Inventory";
import Grievances from "./modules/Grievances";
import RoomIssues from "./modules/RoomIssues";
import SeatingAssignment from "./modules/SeatingAssignment";
import BorrowDashboard from "./modules/Borrowing/Dashboard";
import PendingRequests from "./modules/Borrowing/PendingRequests";
import UserDashboard from "./modules/Borrowing/UserDashboard";
import LabTechDashboard from "./modules/Borrowing/LabTechDashboard";
import LandingPage from "./modules/Borrowing/LandingPage";

function App() {
  return (
    <Routes>
      <Route element={<SignedInLayout />} >
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/borrowing" element={<Borrowing />} >
          <Route path="dashboard" element={<BorrowDashboard/>}/>
          <Route path="pending-requests" element={<PendingRequests />}/>
          <Route path="user-dashboard" element={<UserDashboard />}/>
          <Route path="labtech-dashboard" element={<LabTechDashboard />}/>
        </Route>
        
        
        
        <Route path="/seating-assignment" element={<SeatingAssignment />} />
        <Route path="/meeting-scheduler" element={<MeetingScheduler />} />
        <Route path="/bulletin-board" element={<BulletinBoard />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/event-manager" element={<EventManager />} />
        <Route path="/inventory" element={<Inventory/>} />
        <Route path="/grievances" element={<Grievances />} />
        <Route path="/room-issues" element={<RoomIssues />} />
      </Route>
      <Route element={<SignedOutLayout />} >
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
