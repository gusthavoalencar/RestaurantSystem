import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ISellOrder } from '../../global/types';
import { parseISO, format } from 'date-fns';

interface SalesChartProps {
    data: ISellOrder[];
}

const OrdersChart = ({ data }: SalesChartProps) => {

    const chartData: { labels: string[], values: number[] } = { labels: [], values: [] };
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    const prepareSalesData = (orders: ISellOrder[]) => {
        const salesMap: { [key: string]: number } = {};

        orders.forEach((order) => {
            const date = parseISO(order.createdAt);
            const monthYear = format(date, 'yyyy-MM');
            salesMap[monthYear] = (salesMap[monthYear] || 0) + 1;
        });

        const sortedKeys = Object.keys(salesMap).sort();
        chartData.labels = sortedKeys;
        chartData.values = sortedKeys.map(key => salesMap[key]);
    };

    useEffect(() => {
        prepareSalesData(data);
        if (!chartRef.current) {
            return;
        }

        const ctx = chartRef.current.getContext('2d');

        if (!ctx) {
            return;
        }

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Orders per month',
                    data: chartData.values,
                    backgroundColor: 'rgba(146, 225, 225, 0.3)',
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 1,
                }],
            },
            options: {
                scales: {
                    x: {
                        type: 'category',
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            chart.destroy();
        };
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default OrdersChart;