import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, User } from 'lucide-react';
import { deptStyleMap } from '@/data/mockData';

const FacultyCard = ({ faculty, index = 0 }) => {
  const navigate = useNavigate();

  const statusClass = faculty.status === 'available' ? 'status-available' : faculty.status === 'busy' ? 'status-busy' : '';
  const statusLabel = faculty.status === 'available' ? 'Available' : faculty.status === 'busy' ? 'Busy' : 'Away';
  const dotColor = faculty.status === 'available' ? 'bg-green-500' : faculty.status === 'busy' ? 'bg-red-500' : 'bg-gray-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => navigate(`/faculty/${faculty.id}`)}
      className="glass-card-hover cursor-pointer p-5 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <User className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              {faculty.name}
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{faculty.cabin}</p>
          </div>
        </div>
        <span className={`dept-badge ${deptStyleMap[faculty.department]}`}>{faculty.department}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <MapPin className="w-3.5 h-3.5" />
          {faculty.currentLocation}
        </div>
        <div className={`flex items-center gap-1.5 text-xs font-medium ${statusClass}`}>
          <span className={`w-2 h-2 rounded-full ${dotColor} animate-pulse`} />
          {statusLabel}
        </div>
      </div>
    </motion.div>
  );
};

export default FacultyCard;
