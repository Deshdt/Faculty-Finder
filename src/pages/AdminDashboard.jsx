import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Upload, LogOut, X, Save, Clock } from 'lucide-react';
import { facultyData as initialData, departments, deptStyleMap } from '@/data/mockData';
import GradientBlobs from '@/components/GradientBlobs';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState([...initialData]);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showSlotManager, setShowSlotManager] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('ff_admin') !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const emptyFaculty = {
    id: Date.now().toString(),
    name: '', department: 'CE', gender: 'Male',
    cabin: '', currentLocation: '', status: 'available', schedule: [],
  };

  const handleSave = (f) => {
    if (!f.name || !f.cabin) {
      toast.error('Name and Cabin are required');
      return;
    }
    if (isAdding) {
      setFaculty([...faculty, { ...f, id: Date.now().toString() }]);
      toast.success('Faculty added');
    } else {
      setFaculty(faculty.map((x) => (x.id === f.id ? f : x)));
      toast.success('Faculty updated');
    }
    setEditingFaculty(null);
    setIsAdding(false);
    setShowSlotManager(false);
  };

  const handleDelete = (id) => {
    setFaculty(faculty.filter((f) => f.id !== id));
    toast.success('Faculty removed');
  };

  const handleLogout = () => {
    localStorage.removeItem('ff_admin');
    navigate('/');
  };

  return (
    <div className="min-h-screen relative">
      <GradientBlobs />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Admin Dashboard</h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Manage faculty and schedules</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setIsAdding(true); setEditingFaculty(emptyFaculty); }} className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Faculty
            </button>
            <button onClick={() => setShowUpload(true)} className="px-4 py-2 text-sm flex items-center gap-2 rounded-xl transition-all hover:bg-white/10" style={{ color: 'var(--text-secondary)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Upload className="w-4 h-4" /> Upload Timetable
            </button>
            <button onClick={handleLogout} className="px-4 py-2 text-sm flex items-center gap-2 rounded-xl hover:bg-white/10 transition-all" style={{ color: 'var(--text-muted)' }}>
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  {['Name', 'Department', 'Gender', 'Cabin', 'Location', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {faculty.map((f) => (
                  <tr key={f.id} className="hover:bg-white/5 transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{f.name}</td>
                    <td className="px-4 py-3"><span className={`dept-badge ${deptStyleMap[f.department]}`}>{f.department}</span></td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{f.gender}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{f.cabin}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{f.currentLocation}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${f.status === 'available' ? 'status-available' : f.status === 'busy' ? 'status-busy' : ''}`}>
                        {f.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setEditingFaculty(f); setIsAdding(false); }} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" title="Edit">
                          <Pencil className="w-3.5 h-3.5" style={{ color: 'var(--text-secondary)' }} />
                        </button>
                        <button onClick={() => { setEditingFaculty(f); setShowSlotManager(true); }} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" title="Schedule">
                          <Clock className="w-3.5 h-3.5" style={{ color: 'var(--text-secondary)' }} />
                        </button>
                        <button onClick={() => handleDelete(f.id)} className="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" style={{ color: '#ef4444' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AnimatePresence>
          {editingFaculty && !showSlotManager && (
            <FacultyModal
              faculty={editingFaculty}
              isAdding={isAdding}
              onSave={handleSave}
              onClose={() => { setEditingFaculty(null); setIsAdding(false); }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSlotManager && editingFaculty && (
            <SlotManagerModal
              faculty={editingFaculty}
              onSave={(updated) => { handleSave(updated); setShowSlotManager(false); }}
              onClose={() => { setShowSlotManager(false); setEditingFaculty(null); }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FacultyModal = ({ faculty, isAdding, onSave, onClose }) => {
  const [form, setForm] = useState({ ...faculty });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative glass-card p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{isAdding ? 'Add Faculty' : 'Edit Faculty'}</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" style={{ color: 'var(--text-muted)' }} /></button>
        </div>
        <div className="space-y-3">
          <InputField label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Department</label>
              <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="glass-input w-full px-3 py-2.5 text-sm">
                {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Gender</label>
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="glass-input w-full px-3 py-2.5 text-sm">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <InputField label="Cabin" value={form.cabin} onChange={(v) => setForm({ ...form, cabin: v })} />
          <InputField label="Current Location" value={form.currentLocation} onChange={(v) => setForm({ ...form, currentLocation: v })} />
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={() => onSave(form)} className="btn-primary flex-1 py-2.5 text-sm flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Save</button>
          <button onClick={onClose} className="flex-1 py-2.5 text-sm rounded-xl hover:bg-white/10 transition-colors" style={{ color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.1)' }}>Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SlotManagerModal = ({ faculty, onSave, onClose }) => {
  const [slots, setSlots] = useState([...faculty.schedule]);
  const [newSlot, setNewSlot] = useState({ time: '', location: '', activity: '' });

  const addSlot = () => {
    if (!newSlot.time || !newSlot.location || !newSlot.activity) {
      toast.error('Fill all slot fields');
      return;
    }
    setSlots([...slots, { id: Date.now().toString(), ...newSlot }]);
    setNewSlot({ time: '', location: '', activity: '' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative glass-card p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Schedule — {faculty.name}</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" style={{ color: 'var(--text-muted)' }} /></button>
        </div>

        <div className="space-y-2 mb-5">
          {slots.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-mono">{s.time}</span> · {s.activity} @ {s.location}
              </div>
              <button onClick={() => setSlots(slots.filter((_, j) => j !== i))} className="p-1 hover:bg-red-500/20 rounded-lg">
                <Trash2 className="w-3.5 h-3.5" style={{ color: '#ef4444' }} />
              </button>
            </div>
          ))}
          {slots.length === 0 && <p className="text-xs text-center py-4" style={{ color: 'var(--text-muted)' }}>No slots yet</p>}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <input value={newSlot.time} onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })} placeholder="Time" className="glass-input px-3 py-2 text-xs" />
          <input value={newSlot.location} onChange={(e) => setNewSlot({ ...newSlot, location: e.target.value })} placeholder="Location" className="glass-input px-3 py-2 text-xs" />
          <input value={newSlot.activity} onChange={(e) => setNewSlot({ ...newSlot, activity: e.target.value })} placeholder="Activity" className="glass-input px-3 py-2 text-xs" />
        </div>
        <button onClick={addSlot} className="w-full py-2 text-xs rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-1" style={{ color: 'var(--text-secondary)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Plus className="w-3.5 h-3.5" /> Add Slot
        </button>

        <div className="flex gap-2 mt-5">
          <button onClick={() => onSave({ ...faculty, schedule: slots })} className="btn-primary flex-1 py-2.5 text-sm flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Save Schedule</button>
          <button onClick={onClose} className="flex-1 py-2.5 text-sm rounded-xl hover:bg-white/10 transition-colors" style={{ color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.1)' }}>Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const UploadModal = ({ onClose }) => {
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    setTimeout(() => {
      setUploaded(true);
      toast.success('Timetable uploaded successfully!');
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative glass-card p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Upload Timetable</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" style={{ color: 'var(--text-muted)' }} /></button>
        </div>
        {!uploaded ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)', border: '2px dashed rgba(255,255,255,0.15)' }}>
              <Upload className="w-7 h-7" style={{ color: 'var(--text-muted)' }} />
            </div>
            <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Drag & drop or click to upload</p>
            <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Supports CSV, XLSX</p>
            <button onClick={handleUpload} className="btn-primary px-8 py-2.5 text-sm">Upload File</button>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.15)' }}>
              <span className="text-3xl">✓</span>
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Timetable uploaded successfully!</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Schedules have been updated</p>
            <button onClick={onClose} className="btn-primary px-8 py-2.5 text-sm mt-5">Done</button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const InputField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{label}</label>
    <input value={value} onChange={(e) => onChange(e.target.value)} className="glass-input w-full px-3 py-2.5 text-sm" />
  </div>
);

export default AdminDashboard;
