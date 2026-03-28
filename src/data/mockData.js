export const departments = [
  { id: 'CE', name: 'CE', fullName: 'Computer Engineering' },
  { id: 'IT', name: 'IT', fullName: 'Information Technology' },
  { id: 'ENTC', name: 'ENTC', fullName: 'Electronics & Telecommunication' },
  { id: 'ECE', name: 'ECE', fullName: 'Electronics & Computer Engineering' },
  { id: 'AIDS', name: 'AIDS', fullName: 'AI & Data Science' },
];

export const deptStyleMap = {
  CE: 'dept-ce',
  IT: 'dept-it',
  ENTC: 'dept-entc',
  ECE: 'dept-ece',
  AIDS: 'dept-aids',
};

export const deptGradientMap = {
  CE: 'from-green-500 to-emerald-500',
  IT: 'from-blue-500 to-cyan-500',
  ENTC: 'from-purple-500 to-pink-500',
  ECE: 'from-orange-500 to-red-500',
  AIDS: 'from-yellow-400 to-yellow-500',
};

export const facultyData = [
  {
    id: '1', name: 'Dr. Anil Sharma', department: 'CE', gender: 'Male',
    cabin: 'CE-101', currentLocation: 'In Cabin', status: 'available',
    schedule: [
      { id: 's1', time: '09:00 - 10:00', location: 'Room 301', activity: 'Data Structures Lecture' },
      { id: 's2', time: '10:00 - 11:00', location: 'CE-101', activity: 'Office Hours' },
      { id: 's3', time: '11:00 - 12:00', location: 'Lab 5', activity: 'OS Lab' },
      { id: 's4', time: '14:00 - 15:00', location: 'Room 301', activity: 'Algorithm Design' },
    ],
  },
  {
    id: '2', name: 'Prof. Meera Joshi', department: 'CE', gender: 'Female',
    cabin: 'CE-102', currentLocation: 'Room 205', status: 'busy',
    schedule: [
      { id: 's5', time: '09:00 - 10:00', location: 'Room 205', activity: 'DBMS Lecture' },
      { id: 's6', time: '11:00 - 12:00', location: 'CE-102', activity: 'Office Hours' },
      { id: 's7', time: '14:00 - 15:30', location: 'Lab 3', activity: 'DBMS Lab' },
    ],
  },
  {
    id: '3', name: 'Dr. Rajesh Kulkarni', department: 'CE', gender: 'Male',
    cabin: 'CE-103', currentLocation: 'In Cabin', status: 'available',
    schedule: [
      { id: 's8', time: '10:00 - 11:00', location: 'Room 302', activity: 'Computer Networks' },
      { id: 's9', time: '13:00 - 14:00', location: 'CE-103', activity: 'Mentoring' },
    ],
  },
  {
    id: '4', name: 'Prof. Sneha Patil', department: 'IT', gender: 'Female',
    cabin: 'IT-201', currentLocation: 'In Cabin', status: 'available',
    schedule: [
      { id: 's10', time: '09:00 - 10:00', location: 'Room 401', activity: 'Web Technologies' },
      { id: 's11', time: '11:00 - 12:00', location: 'Lab 7', activity: 'Web Dev Lab' },
      { id: 's12', time: '14:00 - 15:00', location: 'IT-201', activity: 'Office Hours' },
    ],
  },
  {
    id: '5', name: 'Dr. Vikram Desai', department: 'IT', gender: 'Male',
    cabin: 'IT-202', currentLocation: 'Lab 8', status: 'busy',
    schedule: [
      { id: 's13', time: '09:30 - 11:00', location: 'Lab 8', activity: 'Cloud Computing Lab' },
      { id: 's14', time: '11:00 - 12:00', location: 'Room 402', activity: 'Software Engineering' },
      { id: 's15', time: '15:00 - 16:00', location: 'IT-202', activity: 'Research' },
    ],
  },
  {
    id: '6', name: 'Prof. Anita Bhosale', department: 'IT', gender: 'Female',
    cabin: 'IT-203', currentLocation: 'In Cabin', status: 'available',
    schedule: [
      { id: 's16', time: '10:00 - 11:00', location: 'Room 403', activity: 'Information Security' },
      { id: 's17', time: '13:00 - 14:00', location: 'IT-203', activity: 'Student Counseling' },
    ],
  },
  {
    id: '7', name: 'Dr. Prashant More', department: 'ENTC', gender: 'Male',
    cabin: 'ENTC-301', currentLocation: 'Room 501', status: 'busy',
    schedule: [
      { id: 's18', time: '09:00 - 10:30', location: 'Room 501', activity: 'Signal Processing' },
      { id: 's19', time: '11:00 - 12:00', location: 'Lab 10', activity: 'DSP Lab' },
      { id: 's20', time: '14:00 - 15:00', location: 'ENTC-301', activity: 'Office Hours' },
    ],
  },
  {
    id: '8', name: 'Prof. Kavita Nair', department: 'ENTC', gender: 'Female',
    cabin: 'ENTC-302', currentLocation: 'In Cabin', status: 'available',
    schedule: [
      { id: 's21', time: '10:00 - 11:00', location: 'Room 502', activity: 'Embedded Systems' },
      { id: 's22', time: '14:00 - 15:30', location: 'Lab 11', activity: 'Microcontroller Lab' },
    ],
  },
  {
    id: '9', name: 'Dr. Suresh Iyer', department: 'ECE', gender: 'Male',
    cabin: 'ECE-401', currentLocation: 'In Cabin', status: 'available',
    schedule: [
      { id: 's23', time: '09:00 - 10:00', location: 'Room 601', activity: 'VLSI Design' },
      { id: 's24', time: '11:00 - 12:00', location: 'ECE-401', activity: 'Office Hours' },
      { id: 's25', time: '14:00 - 15:00', location: 'Lab 12', activity: 'VLSI Lab' },
    ],
  },
  {
    id: '10', name: 'Prof. Deepa Rao', department: 'ECE', gender: 'Female',
    cabin: 'ECE-402', currentLocation: 'Library', status: 'neutral',
    schedule: [
      { id: 's26', time: '10:00 - 11:30', location: 'Room 602', activity: 'Digital Electronics' },
      { id: 's27', time: '13:00 - 14:00', location: 'Library', activity: 'Research' },
    ],
  },
  {
    id: '11', name: 'Dr. Amit Patel', department: 'AIDS', gender: 'Male',
    cabin: 'AIDS-501', currentLocation: 'Lab 15', status: 'busy',
    schedule: [
      { id: 's28', time: '09:00 - 10:30', location: 'Lab 15', activity: 'Machine Learning Lab' },
      { id: 's29', time: '11:00 - 12:00', location: 'Room 701', activity: 'Deep Learning' },
      { id: 's30', time: '14:00 - 15:00', location: 'AIDS-501', activity: 'Office Hours' },
    ],
  },
  {
    id: '12', name: 'Prof. Priya Menon', department: 'AIDS', gender: 'Female',
    cabin: 'AIDS-502', currentLocation: 'In Cabin', status: 'available',
    schedule: [
      { id: 's31', time: '10:00 - 11:00', location: 'Room 702', activity: 'Data Analytics' },
      { id: 's32', time: '13:00 - 14:30', location: 'Lab 16', activity: 'Python Lab' },
    ],
  },
  {
    id: '13', name: 'Dr. Bharat Kale', department: 'CE', gender: 'Male',
    cabin: 'CE-104', currentLocation: 'Conference Hall', status: 'busy',
    schedule: [
      { id: 's33', time: '09:00 - 12:00', location: 'Conference Hall', activity: 'Faculty Meeting' },
      { id: 's34', time: '14:00 - 15:00', location: 'Room 303', activity: 'Compiler Design' },
    ],
  },
  {
    id: '14', name: 'Prof. Gauri Deshpande', department: 'ENTC', gender: 'Female',
    cabin: 'ENTC-303', currentLocation: 'In Cabin', status: 'available',
    schedule: [
      { id: 's35', time: '09:00 - 10:00', location: 'Room 503', activity: 'Communication Systems' },
      { id: 's36', time: '11:00 - 12:00', location: 'ENTC-303', activity: 'Office Hours' },
    ],
  },
  {
    id: '15', name: 'Dr. Nikhil Wagh', department: 'AIDS', gender: 'Male',
    cabin: 'AIDS-503', currentLocation: 'In Cabin', status: 'available',
    schedule: [
      { id: 's37', time: '10:00 - 11:30', location: 'Room 703', activity: 'NLP' },
      { id: 's38', time: '14:00 - 15:00', location: 'AIDS-503', activity: 'Mentoring' },
    ],
  },
];
