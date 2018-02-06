import * as React from 'react'
import {scaleLinear} from 'd3'
import {CategoricalNumeralValues} from "../../models/StatisticsModel";
import {ScaleLinear} from "d3-scale";
import {max, min} from "d3-array";
import "./BarChart.css"

const BAR_PADDING = 10;
const SVG_HEIGHT = 200;
const SVG_WIDTH = 300;
const BOTTOM_PADDING = 40;
const MAX_BAR_WIDTH = 40;
const MIN_BAR_WIDTH = 10;

interface BarChartProps {
    data: CategoricalNumeralValues;
    label: string;
    baseColor: string;
}

interface BarChartState {
}

export class BarChart extends React.Component<BarChartProps, BarChartState> {
    private scale: ScaleLinear<number, number>;
    private barWidth: number;

    constructor (props) {
        super(props)

    }
    private cap(value:number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }
    private adjustScale(newProps: BarChartProps) {
        const values = Array.from(newProps.data.values())

        this.scale = scaleLinear()
            .domain([min(values) || 0, max(values) || 0])
            .range([0, SVG_HEIGHT - BOTTOM_PADDING])

    }
    private adjustBarWidth(newProps:BarChartProps) {
        const numberOfBars:number = newProps.data.size || 1
        const barWidth = SVG_WIDTH / numberOfBars - BAR_PADDING;
        this.barWidth = this.cap(barWidth, 0, MAX_BAR_WIDTH)
    }
    componentWillUpdate(newProps: BarChartProps) {
        this.adjustScale(newProps)
        this.adjustBarWidth(newProps)
    }
    renderBar = ([label,value]: [string, number], index: number) => {
        return <g>
            <rect
                height={this.scale(value)}
                width={this.barWidth}
                style={{fill: this.props.baseColor}}
                x={index * (this.barWidth + BAR_PADDING)}
                y={SVG_HEIGHT - BOTTOM_PADDING - this.scale(value)}
            />
            <text x={this.barWidth / 2 + index * (this.barWidth + BAR_PADDING)}
                  textAnchor="middle"
                  alignmentBaseline="central"
                  width={this.barWidth }
                  y={SVG_HEIGHT - BOTTOM_PADDING / 2}>
                {label}
            </text>
        </g>
    }
    componentWillMount() {
        this.adjustScale(this.props)
        this.adjustBarWidth(this.props)

    }
    public render () {
        return (
            <div className="graph-container">
                <svg className='bar-graph' height={SVG_HEIGHT} width={SVG_WIDTH}>
                    {Array.from(this.props.data.entries()).map(this.renderBar)}
                </svg>
                {this.props.label}
            </div>
        )
    }
}
