"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Activity,
  DollarSign,
  ShoppingCart,
  PercentCircle
} from "lucide-react";
import { apiService } from "@/lib/api-service";
import {
  formatCurrency,
  formatNumber,
  formatCompact,
  formatPercentage,
  formatDate
} from "@/lib/formatters";
import { LineChart } from "@/components/charts/line-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { PieChart } from "@/components/charts/pie-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { DataTable } from "@/components/data-table/data-table";
import { Sale } from "@/lib/mock-data";
import { Skeleton } from "@/components/ui/skeleton";

// TypeScript interfaces for our data
interface DashboardMetrics {
  totalUsers: number;
  activeSessions: number;
  totalRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
}

interface ChartDataPoint {
  [key: string]: string | number;
}

export default function DashboardPage() {
  // State for data
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [salesData, setSalesData] = useState<ChartDataPoint[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<ChartDataPoint[]>([]);
  const [categoryData, setCategoryData] = useState<ChartDataPoint[]>([]);

  // Fetch dashboard data
  useEffect(() => {
    async function fetchDashboardData() {
      setIsLoading(true);
      try {
        const [
          metricsData,
          recentSalesData,
          salesChartData,
          userGrowthChartData,
          categoryChartData,
        ] = await Promise.all([
          apiService.getDashboardMetrics(),
          apiService.getRecentSales(),
          apiService.getSalesData(),
          apiService.getUserGrowthData(),
          apiService.getCategoryData(),
        ]);

        setMetrics(metricsData);
        setRecentSales(recentSalesData);
        setSalesData(salesChartData);
        setUserGrowthData(userGrowthChartData);
        setCategoryData(categoryChartData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // Sales table columns
  const salesColumns = [
    {
      header: "Product",
      accessorKey: "product",
      sortable: true,
    },
    {
      header: "Customer",
      accessorKey: "customer",
      sortable: true,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      sortable: true,
      cell: (row: Sale) => formatCurrency(row.amount),
    },
    {
      header: "Date",
      accessorKey: "date",
      sortable: true,
      cell: (row: Sale) => formatDate(row.date),
    },
    {
      header: "Category",
      accessorKey: "category",
      sortable: true,
    },
    {
      header: "Status",
      accessorKey: "status",
      sortable: true,
      cell: (row: Sale) => {
        const statusStyles = {
          completed: "bg-green-100 text-green-800",
          pending: "bg-yellow-100 text-yellow-800",
          refunded: "bg-red-100 text-red-800",
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}
          >
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </span>
        );
      },
    },
  ];

  // Loading states
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] rounded-md" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-[350px] rounded-md" />
          <Skeleton className="h-[350px] rounded-md" />
        </div>
        <Skeleton className="h-[350px] rounded-md" />
        <Skeleton className="h-[450px] rounded-md" />
      </div>
    );
  }

  // Make sure metrics is available before rendering
  if (!metrics) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={formatCompact(metrics.totalUsers)}
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
          color="#2563eb"
        />
        <StatCard
          title="Active Sessions"
          value={formatNumber(metrics.activeSessions)}
          icon={Activity}
          color="#16a34a"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(metrics.totalRevenue)}
          icon={DollarSign}
          trend={{ value: 8.2, isPositive: true }}
          color="#ea580c"
        />
        <StatCard
          title="Conversion Rate"
          value={formatPercentage(metrics.conversionRate, 1)}
          icon={PercentCircle}
          trend={{ value: 1.8, isPositive: false }}
          color="#7c3aed"
        />
      </div>

      {/* Charts - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LineChart
          title="Revenue Over Time"
          description="Monthly revenue for the current year"
          data={salesData}
          xKey="month"
          yKey="revenue"
          yLabel="Revenue ($)"
          color="#16a34a"
        />
        <BarChart
          title="User Growth"
          description="Monthly user growth for the current year"
          data={userGrowthData}
          xKey="month"
          yKey="users"
          yLabel="Users"
          color="#2563eb"
        />
      </div>

      {/* Category Distribution */}
      <PieChart
        title="Sales by Category"
        description="Distribution of sales across product categories"
        data={categoryData}
        nameKey="name"
        dataKey="value"
        height={350}
      />

      {/* Recent Sales Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Recent Sales</h2>
        <DataTable
          columns={salesColumns}
          data={recentSales}
          searchKey="product"
        />
      </div>
    </div>
  );
}
