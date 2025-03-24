import { User } from './store';

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user',
  },
  {
    id: '3',
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'analyst',
  },
  {
    id: '4',
    email: 'robert@example.com',
    name: 'Robert Johnson',
    role: 'user',
  },
  {
    id: '5',
    email: 'sarah@example.com',
    name: 'Sarah Williams',
    role: 'user',
  },
];

// Mock user growth by month for current year
export const userGrowthData = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 145 },
  { month: 'Mar', users: 178 },
  { month: 'Apr', users: 205 },
  { month: 'May', users: 248 },
  { month: 'Jun', users: 302 },
  { month: 'Jul', users: 356 },
  { month: 'Aug', users: 410 },
  { month: 'Sep', users: 458 },
  { month: 'Oct', users: 512 },
  { month: 'Nov', users: 545 },
  { month: 'Dec', users: 580 },
];

// Mock sales data by month
export const salesData = [
  { month: 'Jan', revenue: 15000 },
  { month: 'Feb', revenue: 18000 },
  { month: 'Mar', revenue: 17500 },
  { month: 'Apr', revenue: 19000 },
  { month: 'May', revenue: 22000 },
  { month: 'Jun', revenue: 25500 },
  { month: 'Jul', revenue: 28000 },
  { month: 'Aug', revenue: 30000 },
  { month: 'Sep', revenue: 32500 },
  { month: 'Oct', revenue: 34000 },
  { month: 'Nov', revenue: 36500 },
  { month: 'Dec', revenue: 40000 },
];

// Mock category distribution
export const categoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Home Goods', value: 20 },
  { name: 'Books', value: 15 },
  { name: 'Other', value: 5 },
];

// Mock recent sales
export interface Sale {
  id: string;
  product: string;
  customer: string;
  amount: number;
  date: string;
  category: string;
  status: 'completed' | 'pending' | 'refunded';
}

export const recentSales: Sale[] = [
  {
    id: 's1',
    product: 'Smartphone X',
    customer: 'John Smith',
    amount: 1299,
    date: '2024-03-20',
    category: 'Electronics',
    status: 'completed',
  },
  {
    id: 's2',
    product: 'Designer Shirt',
    customer: 'Emily Johnson',
    amount: 89,
    date: '2024-03-19',
    category: 'Clothing',
    status: 'completed',
  },
  {
    id: 's3',
    product: 'Coffee Maker',
    customer: 'Robert Davis',
    amount: 129,
    date: '2024-03-18',
    category: 'Home Goods',
    status: 'pending',
  },
  {
    id: 's4',
    product: 'Bestseller Book',
    customer: 'Sarah Wilson',
    amount: 24,
    date: '2024-03-17',
    category: 'Books',
    status: 'completed',
  },
  {
    id: 's5',
    product: 'Wireless Headphones',
    customer: 'Michael Brown',
    amount: 199,
    date: '2024-03-16',
    category: 'Electronics',
    status: 'refunded',
  },
  {
    id: 's6',
    product: 'Smart Watch',
    customer: 'Jennifer Lee',
    amount: 349,
    date: '2024-03-15',
    category: 'Electronics',
    status: 'completed',
  },
  {
    id: 's7',
    product: 'Running Shoes',
    customer: 'David Miller',
    amount: 120,
    date: '2024-03-14',
    category: 'Clothing',
    status: 'completed',
  },
  {
    id: 's8',
    product: 'Blender',
    customer: 'Lisa Taylor',
    amount: 89,
    date: '2024-03-13',
    category: 'Home Goods',
    status: 'pending',
  },
];

// Mock dashboard metrics
export const metrics = {
  totalUsers: 580,
  activeSessions: 128,
  totalRevenue: 345920,
  averageOrderValue: 125,
  conversionRate: 3.2,
};

// Mock active sessions by hour
export const activeSessionsByHour = [
  { hour: '00:00', sessions: 25 },
  { hour: '02:00', sessions: 18 },
  { hour: '04:00', sessions: 12 },
  { hour: '06:00', sessions: 15 },
  { hour: '08:00', sessions: 35 },
  { hour: '10:00', sessions: 68 },
  { hour: '12:00', sessions: 92 },
  { hour: '14:00', sessions: 102 },
  { hour: '16:00', sessions: 118 },
  { hour: '18:00', sessions: 132 },
  { hour: '20:00', sessions: 98 },
  { hour: '22:00', sessions: 65 },
];
