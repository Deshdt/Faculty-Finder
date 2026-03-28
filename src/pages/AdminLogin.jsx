import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff } from 'lucide-react';
import GradientBlobs from '@/components/GradientBlobs';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('ff_admin', 'true');
      toast.success('Welcome, Admin!');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <GradientBlobs />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card p-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
              <Shield className="w-6 h-6" style={{ color: 'white' }} />
            </div>
            <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Admin Login</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="glass-input w-full px-4 py-3 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="glass-input w-full px-4 py-3 pr-10 text-sm"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="w-4 h-4" style={{ color: 'var(--text-muted)' }} /> : <Eye className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full py-3 text-sm mt-2">
              Sign In
            </button>
          </form>

          <button onClick={() => navigate('/')} className="w-full mt-4 text-xs text-center py-2" style={{ color: 'var(--text-muted)' }}>
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
