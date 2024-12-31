import React from 'react'
import { useState } from 'react'
import './App.css'
import './index.css'

import { BrowserRouter } from 'react-router-dom'


import AppRoutes from './Routes' //defining routes separately because khach khach and importing routes

function App() {
  return (
    <>
    <BrowserRouter>
{/* linking routes here */}
<AppRoutes />
    </BrowserRouter>
    </>
    
  )
}

export default App
