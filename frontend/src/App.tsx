import { Route, Routes } from "react-router-dom";
import AuthanticatedLayout from "./layouts/Authanticated";
import BasicLayout from "./layouts/Basic";
import Home from "./pages/homepage";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import GroupForm from "./pages/groupForm";
import Groups from "./pages/groups";
import GroupChatUI from "./pages/message";
import JoinedGroup from "./pages/joinedGroups";

function App() {
  return (
    <Routes>
      <Route element={<AuthanticatedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-group" element={<GroupForm />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/joined-groups" element={<JoinedGroup />} />
        <Route path="/chat/:groupId" element={<GroupChatUI />} />
      </Route>
      <Route element={<BasicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
