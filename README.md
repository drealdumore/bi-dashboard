# Business Intelligence Dashboard

A fully functional and visually appealing Business Intelligence (BI) tool with user authentication, data visualization, and a dashboard displaying meaningful business metrics.

## Features

### Authentication
- **Login Page**: Email/password login with "Keep me logged in" option
- **Registration Page**: New user registration with form validation
- **Auto Logout**: Users are logged out after 1 minute of inactivity (unless "Keep me logged in" is selected)
- **Protected Routes**: Dashboard access restricted to authenticated users only

### Dashboard
- **Metrics Summary**: Key business metrics displayed in easy-to-read cards
- **Data Visualization**: Multiple chart types (line, bar, pie) showing various business trends
- **Data Tables**: Interactive tables with sorting, filtering, and pagination
- **Responsive Design**: Fully responsive layout that works on mobile and desktop

### Technical Implementation
- **Next.js**: Built with Next.js for server-rendered React applications
- **Tailwind CSS**: Styled with Tailwind for a clean, modern UI
- **Recharts**: Data visualizations created with Recharts library
- **Authentication**: Client-side authentication with Zustand state management
- **Form Validation**: Form validation using React Hook Form and Zod
- **Mock Data**: API simulation for development and testing

## Getting Started

### Prerequisites
- Node.js 16.8+ (or Bun)
- npm or Bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bi-dashboard.git
cd bi-dashboard
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Run the development server:
```bash
bun run dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Login Credentials
You can use any of these mock user accounts to log in:

- Email: `admin@example.com` (Admin user)
- Email: `john@example.com` (Regular user)
- Password: Any password will work with the mock authentication

### Dashboard Navigation
- Use the sidebar to navigate between different dashboard sections
- Explore charts and tables to analyze business data
- Try the search and filter features in data tables

## Project Structure

```
bi-dashboard/
├── src/
│   ├── app/                  # Next.js pages
│   ├── components/           # React components
│   │   ├── auth/             # Authentication components
│   │   ├── charts/           # Chart components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── data-table/       # Table components
│   │   └── ui/               # UI components (shadcn/ui)
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Utility functions and services
├── public/                   # Static assets
└── ... configuration files
```

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
