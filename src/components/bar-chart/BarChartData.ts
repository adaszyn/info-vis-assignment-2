export interface BarChartDataPoint {
    value: number;
    label: string;
}

export interface BarChartData {
    dataPoints: [BarChartDataPoint];
}