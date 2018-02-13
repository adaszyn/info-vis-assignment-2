import * as React from 'react'
import {scaleLinear} from 'd3'
import {CategoricalNumeralValues} from "../../models/StatisticsModel";
import {ScaleLinear, scaleQuantize} from "d3-scale";
import {max, min, range} from "d3-array";
import "./BarChart.css"

const BAR_PADDING = 10;
const SVG_HEIGHT = 220;
const SVG_WIDTH = 340;
const SVG_LABEL_MARGIN = 40;
const TOP_MARGIN = 20;
const BOTTOM_PADDING = 40;
const MAX_BAR_WIDTH = 40;

const SVG_WORKING_WIDTH = SVG_WIDTH - SVG_LABEL_MARGIN;
const SVG_WORKING_HEIGHT = SVG_HEIGHT - TOP_MARGIN;

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
            .domain([0, max(values) || 0])
            .range([0, SVG_WORKING_HEIGHT - BOTTOM_PADDING])

    }
    private adjustBarWidth(newProps:BarChartProps) {
        const numberOfBars:number = newProps.data.size || 1
        const barWidth = SVG_WORKING_WIDTH / numberOfBars - BAR_PADDING;
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
                style={{fill: this.props.baseColor, zIndex: 3}}
                x={index * (this.barWidth + BAR_PADDING)}
                y={SVG_HEIGHT - BOTTOM_PADDING - this.scale(value)}
            />
            <text x={this.barWidth / 2 + index * (this.barWidth + BAR_PADDING)}
                  textAnchor="middle"
                  alignmentBaseline="central"
                  width={this.barWidth }
                  className="bar-graph__bottom-label"
                  y={SVG_HEIGHT - BOTTOM_PADDING / 2}>
                {label}
            </text>
        </g>
    }
    componentWillMount() {
        this.adjustScale(this.props)
        this.adjustBarWidth(this.props)

    }

    renderScale () {
        const values = Array.from(this.props.data.values());
        const maxStep = Math.ceil(max(values)/100)*100;
        const step = Math.ceil((maxStep - 100) / values.length /10)*10
        const steps = range(0, maxStep, step)
        return <g>
            <line
                x1={1}
                x2={1}
                y1={0}
                y2={SVG_HEIGHT - BOTTOM_PADDING}
                style={{strokeWidth: 2, stroke: "darkgrey"}}
            />
            {steps.map((step) => {

                return <g>
                    <line
                        x1={0}
                        x2={SVG_WORKING_WIDTH}
                        y1={SVG_HEIGHT - BOTTOM_PADDING - this.scale(step)}
                        y2={SVG_HEIGHT - BOTTOM_PADDING - this.scale(step)}
                        style={{strokeWidth: 1, stroke: "darkgrey"}}
                    />
                    <text
                        className="bar-graph__scale-label"
                        x={SVG_WORKING_WIDTH}
                        y={SVG_HEIGHT - BOTTOM_PADDING - this.scale(step)}>
                        {step}
                    </text>
                </g>
            })}
        </g>
    }
    public render () {
        if (this.props.data.size === 0) {
            return <div className="no-data-container">
                NO DATA :(
            </div>
        }
        return (
            <div className="graph-container">
                <svg className='bar-graph' height={SVG_HEIGHT} width={SVG_WIDTH}>
                    {this.renderScale()}
                    {Array.from(this.props.data.entries()).map(this.renderBar)}
                </svg>
                {this.props.label}
            </div>
        )
    }
}
