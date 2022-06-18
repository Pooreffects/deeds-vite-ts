import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import TrendyGifs from './components/TrendyGifs';
import SearchedGifs from './components/SearchedGifs';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="trending" element={<TrendyGifs />} />
        <Route path="search" element={<SearchedGifs />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
