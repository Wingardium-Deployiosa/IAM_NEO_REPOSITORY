import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './AuthContext';

// Import all components, including the new OwnerDashboard
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import ReservationList from './components/ReservationList';
import AdminHome from './components/AdminHome';
import AdminRestaurantControl from './components/AdminRestaurantControl';
import ReservationDetailsPage from './components/ReservationDetailsPage';
import OwnerDashboard from './components/OwnerDashboard'; // New
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
return (
<AuthProvider>
<Router>
<div className="App">
<header className="App-header">
<h1>Restaurant Reservation System</h1>
<nav className="navbar"><AuthNav /></nav>
</header>
<main>
<Routes>
<Route path="/login" element={<LoginPage />} />
<Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
<Route path="/restaurants/:id" element={<ProtectedRoute><CustomerOnlyRoute><RestaurantDetail /></CustomerOnlyRoute></ProtectedRoute>} />
<Route path="/admin-control" element={<ProtectedRoute><AdminRestaurantControl /></ProtectedRoute>} />
<Route path="/my-reservations" element={<ProtectedRoute><ReservationList /></ProtectedRoute>} />
<Route path="/manage-reservations" element={<ProtectedRoute><ReservationList /></ProtectedRoute>} />
<Route path="/reservations/:id" element={<ProtectedRoute><ReservationDetailsPage /></ProtectedRoute>} />
<Route path="/owner-dashboard" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />
</Routes>
</main>
</div>
</Router>
</AuthProvider>
);
}

// This component decides which home page to show after login
const HomePage = () => {
const { user } = useAuth();
if (user.role === 'ADMIN') return <AdminHome />;
if (user.role === 'OWNER') return <OwnerDashboard />;
return <RestaurantList />; // Customers land on the restaurant list
};

const AuthNav = () => {
const { user, logout } = useAuth();
if (!user) return <Link to="/login">Login</Link>;

return (
<>
<Link to="/">Home</Link>
{user.role.toUpperCase() === 'CUSTOMER' && <Link to="/my-reservations">My Reservations</Link>}
{user.role.toUpperCase() === 'OWNER' && <Link to="/manage-reservations">Manage Reservations</Link>}
{user.role.toUpperCase() === 'ADMIN' && (
<>
<Link to="/admin-control">Admin Control</Link>
<Link to="/manage-reservations">All Bookings</Link>
</>
)}
<button onClick={() => {
  if (window.confirm('Are you sure you want to logout?')) {
    logout();
    alert('Logged out successfully!');
  }
}} className="logout-button">Logout</button>
</>
);
};

const CustomerOnlyRoute = ({ children }) => {
const { user } = useAuth();
if (user.role.toUpperCase() !== 'CUSTOMER') {
return <Navigate to="/" />;
}
return children;
};

const ProtectedRoute = ({ children }) => {
const { user } = useAuth();
if (!user) {
return <Navigate to="/login" />;
}
return children;
};

export default App;