import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import all components
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import ReservationList from './components/ReservationList';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Restaurant Reservation System</h1>
          <nav>
            <Link to="/">Restaurants</Link>
            <Link to="/reservations">Reservations</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<RestaurantList />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route path="/reservations" element={<ReservationList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;