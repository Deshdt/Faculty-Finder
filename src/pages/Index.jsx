import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Shield } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import GradientBlobs from '@/components/GradientBlobs';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4">
      <GradientBlobs />

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1
            className="font-display text-5xl sm:text-7xl font-bold mb-4 bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #F6FAFD 0%, #B3CFE5 50%, #4A7FA7 100%)' }}
          >
            Faculty Finder
          </h1>
          <p className="text-lg sm:text-xl mb-10" style={{ color: 'var(--text-secondary)' }}>
            Find your faculty instantly
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <SearchBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8"
        >
          <button
            onClick={() => navigate('/admin')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/10"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}
          >
            <Shield className="w-4 h-4" /> Admin Login
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
