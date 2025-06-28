export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}