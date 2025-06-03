import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  Box } from '@mui/material';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import ScalePage from './pages/ScalePage/ScalePage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import Footer from './components/Footer/Footer';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />

        <Box component="main" flexGrow={1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scale" element={<ScalePage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </BrowserRouter>
  );
};

export default App;
