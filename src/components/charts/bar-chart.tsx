"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DataPoint {
  [key: string]: string | number;
}

interface BarChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  xKey: string;
  yKey: string;
  yLabel?: string;
  className?: string;
  height?: number;
  color?: string;
}

export function BarChart({
  title,
  description,
  data,
  xKey,
  yKey,
  yLabel,
  className = "",
  height = 350,
  color = "#2563eb",
}: BarChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey={xKey}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                width={40}
                tickFormatter={(value) => {
                  if (value >= 1000) {
                    return `${(value / 1000).toFixed(0)}k`;
                  }
                  return value;
                }}
                label={
                  yLabel ? { value: yLabel, angle: -90, position: "insideLeft" } : undefined
                }
              />
              <Tooltip
                formatter={(value: number) => [
                  yKey === "revenue" ? `$${value.toLocaleString()}` : value,
                  yLabel || yKey,
                ]}
              />
              <Legend />
              <Bar
                dataKey={yKey}
                fill={color}
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
