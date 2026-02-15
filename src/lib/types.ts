
export type Department = {
  id: string;
  name: string;
  description: string;
};

export type Registration = {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  address: string;
  department: string;
  medicalCondition: string;
};

export type Patient = {
  bookNumber: string;
  name: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female';
  area: string;
  tokenNumber?: string;
  status?: 'Waiting for Doctor' | 'With Doctor' | 'Waiting for Lab' | 'Waiting for Pharmacy' | 'Counselling' | 'Done';
  assignedDoctorId?: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
};
