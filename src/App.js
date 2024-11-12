import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ComicsComponent from './components/ComicsComponent';
import ComicsFavoritos from './components/ComicsFavoritos';
import './App.css'; 

const App = () => {
    return (
        <Router>
            <div className="app-title">
                <img src="/marvel.png" alt="Marvel Logo" className="marvel-logo" />
            </div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/comics" />} />
                <Route path="/comics" element={<ComicsComponent />} />
                <Route path="/favoritos" element={<ComicsFavoritos />} />
            </Routes>
        </Router>
    );
};

export default App;
