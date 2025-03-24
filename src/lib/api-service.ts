import { mockUsers, recentSales, userGrowthData, salesData, categoryData, metrics, activeSessionsByHour } from './mock-data';
import { User } from './store';

// Simulated delay to mock API response time
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API service
export const apiService = {
  // Authentication
  async login(email: string, password: string): Promise<{ user: User; token: string } | null> {
    await delay(800);

    // Simple authentication - in a real app, this would validate against a backend
    const user = mockUsers.find((u) => u.email === email);

    // For demo purposes, any password works
    if (user) {
      return {
        user,
        token: `mock-token-${user.id}-${Date.now()}`,
      };
    }

    return null;
  },

  async register(email: string, password: string, name: string): Promise<{ user: User; token: string } | null> {
    await delay(1000);

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return null;
    }

    // Create a new user (note: in a real app, this would send data to a backend)
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      email,
      name,
      role: 'user',
    };

    // In a real app, we would save this user to the database
    // For this demo, we're not actually modifying the mockUsers array

    return {
      user: newUser,
      token: `mock-token-${newUser.id}-${Date.now()}`,
    };
  },

  // Dashboard data
  async getDashboardMetrics(): Promise<typeof metrics> {
    await delay(600);
    return metrics;
  },

  async getRecentSales(limit = 8): Promise<typeof recentSales> {
    await delay(700);
    return recentSales.slice(0, limit);
  },

  async getUserGrowthData(): Promise<typeof userGrowthData> {
    await delay(500);
    return userGrowthData;
  },

  async getSalesData(): Promise<typeof salesData> {
    await delay(500);
    return salesData;
  },

  async getCategoryData(): Promise<typeof categoryData> {
    await delay(400);
    return categoryData;
  },

  async getActiveSessionsByHour(): Promise<typeof activeSessionsByHour> {
    await delay(600);
    return activeSessionsByHour;
  },

  // User operations
  async getUsers(): Promise<User[]> {
    await delay(800);
    return mockUsers;
  }
};
