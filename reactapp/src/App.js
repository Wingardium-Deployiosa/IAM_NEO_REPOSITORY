import React, {useState, createContext, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// Import all your existing components
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import ReservationList from './components/ReservationList';

import './App.css';
import './components/Login.css';

// --- Authentication Context & Hook (self-contained in this file) ---
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// --- Login Component Logic (self-contained in this file) ---
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            const token = response.data.token;
            if (token) {
                login(token);
                navigate('/');
            } else {
                setError('Login failed: No token received.');
            }
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

// --- Main App Component ---
function App() {
    const [user, setUser] = useState(null);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decodedToken = jwt_decode(token);
        setUser({ email: decodedToken.sub, role: decodedToken.role });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <h1>Restaurant Reservation System</h1>
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/reservations">View Reservations</Link>
                            {user ? (
                                <>
                                    <span className="user-email">{user.email} ({user.role})</span>
                                    <button onClick={logout} className="logout-button">Logout</button>
                                </>
                            ) : (
                                <Link to="/login">Login</Link>
                            )}
                        </nav>
                    </header>
                    <main>
                        <Routes>
                            <Route path="/" element={<RestaurantList />} />
                            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
                            <Route path="/reservations" element={<ReservationList />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;