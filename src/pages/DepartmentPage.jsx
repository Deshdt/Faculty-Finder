import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { facultyData, departments, deptGradientMap } from '@/data/mockData';
import SearchBar from '@/components/SearchBar';
import FacultyCard from '@/components/FacultyCard';
import GradientBlobs from '@/components/GradientBlobs';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const DepartmentPage = () => {
  const { deptId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const dept = departments.find((d) => d.id === deptId);

  const faculty = useMemo(() => {
    if (!dept) return [];
    return facultyData
      .filter((f) => f.department === deptId)
      .filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [deptId, searchQuery, dept]);

  const groupedByLetter = useMemo(() => {
    const groups = {};
    faculty.forEach((f) => {
      const letter = f.name.replace(/^(Dr\.|Prof\.)\s*/i, '').charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(f);
    });
    return groups;
  }, [faculty]);

  if (!dept) return <div className="min-h-screen flex items-center justify-center" style={{ color: 'var(--text-primary)' }}>Department not found</div>;

  const scrollToLetter = (letter) => {
    const el = document.getElementById(`letter-${letter}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const gradient = deptGradientMap[dept.id];

  return (
    <div className="min-h-screen relative">
      <GradientBlobs />
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm mb-4 hover:bg-white/5 px-3 py-1.5 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <span className="text-lg font-bold" style={{ color: 'white' }}>{dept.name}</span>
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{dept.fullName}</h1>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{faculty.length} faculty members</p>
            </div>
          </div>
          <SearchBar compact departmentFilter={dept.id} onSearch={(q) => setSearchQuery(q)} />
        </motion.div>

        <div className="flex gap-4">
          <div className="flex-1">
            {faculty.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>No faculty found</p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Try adjusting your search</p>
              </div>
            ) : (
              Object.keys(groupedByLetter).sort().map((letter) => (
                <div key={letter} id={`letter-${letter}`} className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest mb-3 px-1" style={{ color: 'var(--text-muted)' }}>{letter}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {groupedByLetter[letter].map((f, i) => (
                      <FacultyCard key={f.id} faculty={f} index={i} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="hidden md:flex flex-col items-center gap-0.5 sticky top-8 self-start">
            {alphabet.map((l) => (
              <button
                key={l}
                onClick={() => scrollToLetter(l)}
                className="text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
                style={{ color: groupedByLetter[l] ? 'var(--text-primary)' : 'var(--text-muted)' }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;
