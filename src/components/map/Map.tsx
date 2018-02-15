import * as React from 'react';
import {Country, CountryModel} from "../../models/Country";
import {observer} from "mobx-react";
import {ConfigurationModel} from "../../models/Configuration";
import {countriesPaths} from "./CountriesPaths";
import './Map.css'
import {ReactElement} from "react";
import { scaleLinear } from 'd3'
import {min, max, range} from "d3-array";
import {toJS} from "mobx";
import {scaleLog} from "d3-scale";

interface MapProps {
    countries: Array<CountryModel>;
    configuration: ConfigurationModel;
    countriesWithStatisticsCodes: Set<string>;
}

const isNumber = val => typeof val === 'number';
@observer
export class Map extends React.Component<MapProps, any> {
    private chromaticScale;
    private scaleSteps: Array<number> = [];
    constructor(props) {
        super(props);
        this.chromaticScale = scaleLinear()
    }
    private onCountryClick = (event) => {
        const {target: {id}} = event;
        if (!this.doesDataExistForCountry(id)) {
            return;
        }
        const [country] = this.props.countries.filter(country => country.code === id)
        country.fetchDescription()
        this.props.configuration.selectedVariable = null;
        if (event.ctrlKey) {
            this.props.configuration.toggleCountry(country)
        }
        else {
            this.props.configuration.unselectAllCountries()
            this.props.configuration.selectCountry(country)
        }

    }

    private getCountryModelByCode(code:string):CountryModel {
        const [model] = this.props.countries.filter(country => country.code === code)
        return model;
    }
    private updateScale() {
        const selectedVariable = this.props.configuration.selectedVariable;
        if (!selectedVariable) {
            return
        }
        const allValues = this.props.countries
            .map(country => country.statistics.getAggregatedValue(selectedVariable.key))
            .filter(isNumber)
        console.log('all values', toJS(allValues));
        const minValue = min(allValues)
        const maxValue = max(allValues)
        this.chromaticScale = this.chromaticScale
            .domain([minValue, maxValue])
            .range([0.05, 1.0])
        this.scaleSteps = range(minValue, maxValue, (maxValue - minValue) / 10)
    }

    public componentWillReact(props) {
        this.updateScale()
    }

    private getCountryColorByVariable(countryElement: React.ReactElement<any>):string {
        const selectedVariable = this.props.configuration.selectedVariable;
        const country = this.getCountryModelByCode(countryElement.props.id)
        if (!country) {
            return "lightgrey"
        }
        const aggregatedValue = country.statistics.getAggregatedValue(selectedVariable.key)
        if (!aggregatedValue) {
            return "lightgrey"
        }
        return `rgba(255, 0, 0, ${this.chromaticScale(aggregatedValue)})`;
    }

    private getCountryColor (country: ReactElement<any>):string {
        if (this.props.configuration.selectedVariable) {
            return this.getCountryColorByVariable(country)
        }
        const selectedCountry = this.props.configuration.getSelectedCountries()
        if (!this.props.countriesWithStatisticsCodes.has(country.props.id)) {
            return "lightgrey"
        }
        if (!selectedCountry || !this.props.configuration.isCountrySelectedById(country.props.id)) {
            return 'grey'
        }
        return 'red'
    }

    private getStyledCountries() {
        return countriesPaths.map(country => {
            const hasData = this.doesDataExistForCountry(country.props.id);
            return {
                ...country,
                props: {
                    ...country.props,
                    onClick: this.onCountryClick,
                    style: {
                        cursor: hasData ? 'pointer' : 'default'
                    },
                    fill: this.getCountryColor(country)
                }
            }
        })
    }
    private doesDataExistForCountry(countryId: string): boolean {
        return this.props.countriesWithStatisticsCodes.has(countryId)
    }

    render() {
        return (
            <div className='map-container'>
                <svg
                    preserveAspectRatio="xMinYMin meet"
                    width="261.14471"
                    height="184.34802"
                    viewBox="0 0 261.14471 184.34802"
                    version="1.1">

                    <defs
                        id="defs4">
                    </defs>
                    <g
                        id="g8"
                        transform="translate(-406.7078,-175.33163)">
                        {this.getStyledCountries()}
                    </g>
                </svg>
                <div className="map-scale">
                    {this.scaleSteps.map(value => {
                        return <div className="map-scale__block"
                                 style={{
                                     backgroundColor: `rgba(255, 0, 0, ${this.chromaticScale(value)})`
                                 }}
                            >
                                {Math.floor(value * 100) / 100}
                        </div>
                    })}
                </div>
            </div>
        )
    }
}