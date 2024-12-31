import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Mainsection1 from '../components/Mainsection1';
import Cardcomponents from '../components/Cardcomponents';
import Mainsection2 from '../components/Mainsection2';
import GetEarlyAccess from '../components/GetEarlyAccess';
import Footer from '../components/Footer';

function MainLayout() {
  return (
    <>
      <div className="background-color">
        <Navigation />
        <Mainsection1 />
      </div>
      <Cardcomponents />
      <Mainsection2 />
      <GetEarlyAccess/>
      <Footer />
    </>
  );
}

export default MainLayout;
