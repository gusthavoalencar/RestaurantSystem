import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ISellOrder } from '../../global/types';

interface SalesChartProps {
    data: ISellOrder[];
}

const SalesChart = ({ data }: SalesChartProps) => {

    const chartData: { labels: string[], values: number[] } = { labels: [], values: [] };
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    const prepareSalesData = (orders: ISellOrder[]) => {
        const labels: string[] = [];
        const values: number[] = [];

        const salesMap: { [key: string]: number } = {};

        orders.forEach(order => {
            const date = new Date(order.createdAt);
            const label = date.toISOString().split('T')[0];

            if (!salesMap[label]) {
                salesMap[label] = 0;
            }
            salesMap[label] += order.total;
        });

        const sortedLabels = Object.keys(salesMap).sort();
        let cumulativeSales = 0;

        sortedLabels.forEach(label => {
            cumulativeSales += salesMap[label];
            labels.push(label);
            values.push(cumulativeSales);
        });

        chartData.labels = labels;
        chartData.values = values;
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
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Sales over time',
                    data: chartData.values,
                    backgroundColor: 'rgba(89, 166, 86, 0.3)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: true,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            chart.destroy();
        };
    }, [chartData]);

    return <canvas ref={chartRef} />;
};

export default SalesChart;
