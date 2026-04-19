export type Patient = {
  id: number;
  name: string;
  age: number;
  gender: string;
  prescriptions?: Prescription[];
};

export type Prescription = {
  id: number;
  medication: string;
  status: string;
};
