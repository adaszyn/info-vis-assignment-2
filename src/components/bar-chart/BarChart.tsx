import * as React from 'react'
import {BarChartData, BarChartDataPoint} from "./BarChartData";
import {scaleLinear} from 'd3'
interface BarChartProps {
    data: BarChartData;
}

interface BarChartState {
}

export class BarChart extends React.Component<BarChartProps, BarChartState> {

    renderBar = (dataPoint: BarChartDataPoint) => {
        return <rect>

        </rect>
    }
    public render () {
        return (
            <svg>
                {this.props.data.dataPoints.map(this.renderBar)}
            </svg>
        )
    }
}
