"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DataPoint {
  [key: string]: string | number;
}

interface LineChartProps {
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

export function LineChart({
  title,
  description,
  data,
  xKey,
  yKey,
  yLabel,
  className = "",
  height = 350,
  color = "#2563eb",
}: LineChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
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
              <Line
                type="monotone"
                dataKey={yKey}
                stroke={color}
                strokeWidth={2}
                dot={{ stroke: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
