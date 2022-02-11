import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import BearsFactory from './pages/BearsFactory';
import { initWeb3 } from "./components/Web3Client";
import Navbar from "./components/Navbar";

function App() {
    useEffect(() => {
        initWeb3();
    });

    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Homepage/>}></Route>
                <Route path="/bears-factory" element={<BearsFactory/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;