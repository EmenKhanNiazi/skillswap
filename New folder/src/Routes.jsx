import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Mainlayout from './layouts/mainlayout';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import SkillsPage from './pages/viewingSkills';
import MySkillsPage from './pages/viewingmySkills';
import RequestsPage from './pages/RequestSend';
import myrequestsPage from './pages/viewsentreqs';
// import RequestSwapPage from './pages/RequestSwapPage';
import AboutUs from './pages/Aboutus';
import ContactUs from './pages/Contactus';
import SkillsPage2 from './pages/navskills';
import RequestSwap from './pages/newreqpage';
import AdminPage from './pages/adminpanel';
import UsersPage from './pages/Userspage';
import MyRequestsPage from './pages/viewsentreqs';
const AppRoutes=()=>{
    return(
<Routes>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/" element={<Mainlayout />}/>
    <Route path="/profile" element={<Profile />}/>
    <Route path="/skills" element={<Skills />} />
    <Route path="/viewingskills" element={<SkillsPage />} />
    <Route path="/viewingmyskills" element={<MySkillsPage />} />
    <Route path="/requests" element={<RequestsPage />} />
    <Route path='/viewsentreqs' element={<myrequestsPage />}/>
    <Route path="/profile/:id" element={<Profile />} /> 
    {/* <Route path='/viewmyreqs' element={< />}/> */}

    {/* <Route path="/request-swap" element={<RequestSwapPage />} /> */}

    <Route path="/aboutus" element={<AboutUs />} />
    <Route path="/contactus" element={<ContactUs />} />
    <Route path="/navskills" element={<SkillsPage2 />} />
    <Route path="/newreqpage" element={<RequestSwap />}  />
    <Route path="/admin" element={<AdminPage />}  />
    <Route path="/viewusers" element={<UsersPage />}  />
<Route path="/reqs" element={<MyRequestsPage />} />
    {/* <Route path="" */}
</Routes>
    );
};

export default AppRoutes;
