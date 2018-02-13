import * as React from 'react'
import {scaleLinear} from 'd3-scale';
import {CountryModel} from "../../models/Country";
import {VariableModel} from "../../models/VariableModel";
import {max, min} from "d3-array";
import {observer} from "mobx-react";
import {ConfigurationModel} from "../../models/Configuration";

const SVG_WIDTH = 800;
const SVG_HEIGHT = 420;
const MARGIN_BOTTOM = 80;
const SVG_WORKING_HEIGHT = SVG_HEIGHT - MARGIN_BOTTOM;


interface ParallelCoordChartProps {
    countries: Array<CountryModel>;
    variables: Array<VariableModel>;
    onCountrySelect: (country: CountryModel) => void;
    configuration: ConfigurationModel;
}

interface ParallelCoordChartState {
}

@observer
export class ParallelCoordChart extends React.Component<ParallelCoordChartProps, ParallelCoordChartState> {
    private scales: Map<string, any>;

    constructor(props) {
        super(props);
        this.scales = new Map(this.props.variables.map(variable => [variable.key, {scale: scaleLinear()}]) as ([string, any]))
    }

    public recalculateScales() {
        for (let variableKey of Array.from(this.scales.keys())) {
            const allValues = this.props.countries.map(
                country => country.statistics.getAggregatedValue(variableKey)
            )
            const newScale = this.scales.get(variableKey)
                .scale
                .domain([min(allValues), max(allValues)])
                .range([0, SVG_WORKING_HEIGHT])
            this.scales.set(variableKey, {
                scale: newScale,
                values: allValues
            })
        }
    }

    private pointsToString(points: Array<Array<number>>): string {
        return points.reduce((string, [x, y]) => string + `${x}, ${y} `, '')
    }

    private onCountrySelect = (country: CountryModel) => {

    }
    renderPolylines = () => {
        return this.props.countries.map(country => {
            const linePaddingOffset = SVG_WIDTH / (this.scales.size + 1)
            let linePadding = 0
            const points = []
            for (let variableKey of Array.from(this.scales.keys())) {
                linePadding += linePaddingOffset
                const aggregatedValue = country.statistics.getAggregatedValue(variableKey)
                points.push(
                    [linePadding, SVG_WORKING_HEIGHT - this.scales.get(variableKey).scale(aggregatedValue)]
                )
            }
            const isSelected = this.props.configuration.isCountrySelected(country)
            const style = {
                fill: 'none',
                stroke: isSelected ? 'darkred' : 'darkgrey',
                strokeWidth: isSelected ? 2 : 1
            }
            return <polyline
                style={style}
                key={`polyline-${country.code}`}
                onClick={() => this.onCountrySelect(country)}
                points={this.pointsToString(points)}
            />
        })

    }
    getVariableLabelByKey = (key: string):string => {
        return this.props.variables.find(variable => variable.key === key).label
    }
    renderAxes = () => {
        const result = []
        const linePaddingOffset = SVG_WIDTH / (this.scales.size + 1)
        let linePadding = 0
        for (let variableKey of Array.from(this.scales.keys())) {
            linePadding += linePaddingOffset
            const values = this.scales.get(variableKey).values
            const scale = this.scales.get(variableKey).scale
            console.log(`${linePadding} ${SVG_WORKING_HEIGHT + 20}`);
            result.push(
                <g key={`line-${variableKey}`}>
                    <line
                        x1={linePadding}
                        x2={linePadding}
                        y1={0}
                        style={{strokeWidth: 1, stroke: "#696969"}}
                        y2={SVG_WORKING_HEIGHT}
                    />
                    <text x={linePadding}
                          y={SVG_WORKING_HEIGHT + 20}
                          style={{transform: "rotate(70deg)", transformOrigin: `${linePadding}px ${SVG_WORKING_HEIGHT}px`}}
                          textAnchor="middle"
                          alignmentBaseline="central"
                    >
                        {this.getVariableLabelByKey(variableKey)}
                    </text>
                    {values.map(value => <circle
                        cx={linePadding}
                        cy={SVG_WORKING_HEIGHT - scale(value)}
                        r={2}
                        style={{strokeWidth: 2, stroke: "#696969"}}
                    />)}
                </g>
            )
        }
        return result
    }

    public render() {
        this.recalculateScales()
        return (
            <div>
                <svg className="parallel-coord-chart" preserveAspectRatio="xMinYMin meet"
                     width={SVG_WIDTH}
                     height={SVG_HEIGHT}
                     viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                >
                    {this.renderAxes()}
                    {this.renderPolylines()}
                </svg>
            </div>
        )
    }
}
