import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { facultyData, departments } from '@/data/mockData';

const SearchBar = ({ onSearch, compact = false, departmentFilter }) => {
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState(departmentFilter || '');
  const [gender, setGender] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  const filtered = facultyData.filter((f) => {
    const matchName = f.name.toLowerCase().includes(query.toLowerCase());
    const matchDept = dept ? f.department === dept : true;
    const matchGender = gender ? f.gender === gender : true;
    return matchName && matchDept && matchGender;
  });

  const suggestions = query.length > 0 ? filtered.slice(0, 6) : [];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query, dept, gender);
    }
    setShowSuggestions(false);
  };

  const highlightMatch = (text) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="text-purple-400 font-semibold">{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <div ref={ref} className={`relative w-full ${compact ? 'max-w-lg' : 'max-w-2xl'} mx-auto`}>
      <div className="glass-card p-2 flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => query && setShowSuggestions(true)}
            placeholder="Search faculty by name..."
            className="glass-input w-full pl-10 pr-8 py-2.5 text-sm"
          />
          {query && (
            <button onClick={() => { setQuery(''); setShowSuggestions(false); }} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            </button>
          )}
        </div>

        {!compact && (
          <>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="glass-input px-3 py-2.5 text-sm min-w-[130px]"
            >
              <option value="">All Depts</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="glass-input px-3 py-2.5 text-sm min-w-[110px]"
            >
              <option value="">Any Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </>
        )}

        <button onClick={handleSearch} className="btn-primary px-6 py-2.5 text-sm flex items-center justify-center gap-2">
          <Search className="w-4 h-4" /> Search
        </button>
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute z-50 w-full mt-2 glass-card overflow-hidden"
          >
            {suggestions.map((f) => (
              <button
                key={f.id}
                onClick={() => { navigate(`/faculty/${f.id}`); setShowSuggestions(false); }}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{highlightMatch(f.name)}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{f.cabin}</p>
                </div>
                <span className={`dept-badge ${f.department.toLowerCase() === 'ce' ? 'dept-ce' : f.department.toLowerCase() === 'it' ? 'dept-it' : f.department.toLowerCase() === 'entc' ? 'dept-entc' : f.department.toLowerCase() === 'ece' ? 'dept-ece' : 'dept-aids'}`}>
                  {f.department}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
