import * as React from 'react'
import {scaleLinear} from 'd3-scale';
import {CountryModel} from "../../models/Country";
import {VariableModel} from "../../models/VariableModel";
import {max, min} from "d3-array";
import {observer} from "mobx-react";
const SVG_WIDTH = 800;
const SVG_HEIGHT = 400;

interface ParallelCoordChartProps {
    countries: Array<CountryModel>;
    variables: Array<VariableModel>;
    onCountrySelect: (country: CountryModel) => void;
    selectedCountry: CountryModel;
}

interface ParallelCoordChartState {
}

@observer
export class ParallelCoordChart extends React.Component<ParallelCoordChartProps, ParallelCoordChartState> {
    private scales:  Map<string, any>;
    private immigrationScale: any;
    constructor (props) {
        super(props);
        this.immigrationScale = null;
        this.scales = new Map(this.props.variables.map(variable => [variable.key, {scale: scaleLinear()}]) as ([string, any]))
    }
    public recalculateScales () {
        for (let variableKey of Array.from(this.scales.keys())) {
            const allValues = this.props.countries.map(
                country => country.statistics.getAggregatedValue(variableKey)
            )
            const newScale = this.scales.get(variableKey)
                .scale
                .domain([min(allValues), max(allValues)])
                .range([0, SVG_HEIGHT])
            this.scales.set(variableKey, {
                scale: newScale,
                values: allValues
            })
        }
    }
    private pointsToString(points: Array<Array<number>>): string {
        return points.reduce((string, [x,y]) => string + `${x}, ${y} `, '')
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
                    [linePadding, SVG_HEIGHT - this.scales.get(variableKey).scale(aggregatedValue)]
                )
            }
            return <polyline
                style={{fill: 'none', stroke: country === this.props.selectedCountry ? 'darkred' : 'darkgrey', strokeWidth:1}}
                key={`polyline-${country.code}`}
                onClick={() => this.onCountrySelect(country)}
                points={this.pointsToString(points)}
            />
        })

    }
    renderAxes = () => {
        const result = []
        const linePaddingOffset = SVG_WIDTH / (this.scales.size + 1)
        let linePadding = 0
        for (let variableKey of Array.from(this.scales.keys())) {
            linePadding += linePaddingOffset
            const values = this.scales.get(variableKey).values
            const scale = this.scales.get(variableKey).scale
            result.push(
                <g key={`line-${variableKey}`}>
                    <line
                        x1={linePadding}
                        x2={linePadding}
                        y1={0}
                        style={{strokeWidth: 2, stroke: "black"}}
                        y2={SVG_HEIGHT}
                    />
                    { values.map(value => <circle
                        cx={linePadding}
                        cy={SVG_HEIGHT - scale(value)}
                        r={3}
                        style={{strokeWidth: 2, stroke: "black"}}
                    />)}
                </g>
            )
        }
        return result
    }

    componentDidUpdate() {
    }
    public render () {
        const data = this.props.countries;
        this.recalculateScales()
        return (
            <div>
                <svg className="parallel-coord-chart" preserveAspectRatio="xMinYMin meet"
                     width={SVG_WIDTH}
                     height={SVG_HEIGHT}
                     viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                >
                    <g ref={scale => this.immigrationScale = scale} />
                    {this.renderAxes()}
                    {this.renderPolylines()}
                </svg>
            </div>
        )
    }
}
