import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Home from './pages/Home';
import Auth from './components/Auth';
import Profile from './pages/Profile';
import { supabase } from './utils/supabase.ts';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };
    
    fetchUser();

    // subscribe to authentication state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event,session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>

  return (
    <Router>
      <Routes>
        // public routes
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Auth /> : <Navigate to="/profile" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />

        // Protected route
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;