import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, User, Building } from 'lucide-react';
import { facultyData, deptStyleMap, deptGradientMap } from '@/data/mockData';
import GradientBlobs from '@/components/GradientBlobs';

const FacultyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const faculty = facultyData.find((f) => f.id === id);

  if (!faculty) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ color: 'var(--text-primary)' }}>
        <div className="text-center">
          <p className="text-xl font-display font-bold mb-2">Faculty not found</p>
          <button onClick={() => navigate('/')} className="btn-primary px-6 py-2 text-sm">Go Home</button>
        </div>
      </div>
    );
  }

  const statusClass = faculty.status === 'available' ? 'status-available' : faculty.status === 'busy' ? 'status-busy' : '';
  const statusLabel = faculty.status === 'available' ? 'In Cabin' : faculty.status === 'busy' ? 'In Class' : 'Away';
  const dotColor = faculty.status === 'available' ? 'bg-green-500' : faculty.status === 'busy' ? 'bg-red-500' : 'bg-gray-500';
  const gradient = deptGradientMap[faculty.department];

  return (
    <div className="min-h-screen relative">
      <GradientBlobs />
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm mb-6 hover:bg-white/5 px-3 py-1.5 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="glass-card p-6 sm:p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                <User className="w-8 h-8" style={{ color: 'white' }} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{faculty.name}</h1>
                  <span className={`dept-badge ${deptStyleMap[faculty.department]}`}>{faculty.department}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <Building className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                    Cabin: <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{faculty.cabin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <MapPin className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                    Current: <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{faculty.currentLocation}</span>
                  </div>
                </div>

                <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-sm font-medium ${statusClass}`}
                  style={{ background: faculty.status === 'available' ? 'rgba(34,197,94,0.1)' : faculty.status === 'busy' ? 'rgba(239,68,68,0.1)' : 'rgba(148,163,184,0.1)' }}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${dotColor} animate-pulse`} />
                  {statusLabel}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Clock className="w-5 h-5" /> Today's Schedule
            </h2>
            <div className="space-y-3">
              {faculty.schedule.map((slot, i) => (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="text-xs font-mono font-medium shrink-0 w-28 text-center py-1.5 rounded-lg" style={{ color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)' }}>
                    {slot.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{slot.activity}</p>
                    <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      <MapPin className="w-3 h-3" /> {slot.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FacultyProfile;
