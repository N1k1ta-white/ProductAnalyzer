"use client"

import {Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts"

import {
    ChartConfig,
    ChartContainer,
} from "@/components/ui/chart.tsx"
import {Card} from "@/components/ui/card.tsx";

const chartData = [
    { month: "January", revenue: 180 },
    { month: "February", revenue: 505 }, // 305 + 200
    { month: "March", revenue: 357 }, // 237 + 120
    { month: "April", revenue: 263 }, // 73 + 190
    { month: "May", revenue: 339 }, // 209 + 130
    { month: "June", revenue: 354 }, // 214 + 140
    { month: "July", revenue: 320 }, // Примерное значение
    { month: "August", revenue: 400 }, // Примерное значение
    { month: "September", revenue: 280 }, // Примерное значение
    { month: "October", revenue: 310 }, // Примерное значение
    { month: "November", revenue: 290 }, // Примерное значение
    { month: "December", revenue: 450 }, // Примерное значение
];


const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "#000000",
    }
} satisfies ChartConfig

interface Props {
    className?: string,
}

export function TotalRevenueChart({className}: Props) {
    return (
        <Card className={`flex flex-col gap-4 h-full ${className}`}>
            <h2 className="text-lg font-semibold">Total Revenue</h2>
            <ChartContainer config={chartConfig} className="w-full flex-1">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false}/>
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                        dataKey="revenue"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Bar dataKey="revenue" fill="var(--color-desktop)" radius={4}/>
                </BarChart>
            </ChartContainer>
        </Card>
    )
}
