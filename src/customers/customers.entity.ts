export interface Customer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string,
  phone?: string;
  birth_date?: string;
  status: 'pending' | 'approved' | 'rejected';
  role: 'customer' | 'professional';
  created_at: string;
  updated_at: string;
}
