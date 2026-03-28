import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Shield } from 'lucide-react';
import { departments } from '@/data/mockData';

const AppSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
    setOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 p-2.5 glass-card cursor-pointer hover:bg-white/10 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-72 z-50 glass-card rounded-none border-r border-white/10 flex flex-col"
              style={{ background: 'rgba(10, 25, 49, 0.95)', backdropFilter: 'blur(20px)' }}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <h2 className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  Faculty Finder
                </h2>
                <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1">
                <button
                  onClick={() => handleNav('/')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive('/') ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                  style={{ color: isActive('/') ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                >
                  <Home className="w-4 h-4" /> Home
                </button>

                <div className="pt-4 pb-2">
                  <p className="px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Departments
                  </p>
                </div>

                {departments.map((d) => {
                  const path = `/department/${d.id}`;
                  return (
                    <button
                      key={d.id}
                      onClick={() => handleNav(path)}
                      className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive(path) ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                      style={{ color: isActive(path) ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                    >
                      {d.fullName}
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-white/10">
                <button
                  onClick={() => handleNav('/admin')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/5 transition-all"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Shield className="w-4 h-4" /> Admin Login
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppSidebar;
