import * as React from 'react';
import {Country, CountryModel} from "../../models/Country";
import {observer} from "mobx-react";
import {ConfigurationModel} from "../../models/Configuration";
import {countriesPaths} from "./CountriesPaths";
import './Map.css'
import {ReactElement} from "react";
import { scaleLinear } from 'd3'
import {min, max} from "d3-array";

interface MapProps {
    countries: Array<CountryModel>;
    configuration: ConfigurationModel;
    countriesWithStatisticsCodes: Set<string>;
}

@observer
export class Map extends React.Component<MapProps, any> {
    private chromaticScale;
    constructor(props) {
        super(props);
        this.chromaticScale = scaleLinear()
    }
    private onCountryClick = ({target: {id}}) => {
        const [country] = this.props.countries.filter(country => country.code === id)
        country.fetchDescription()
        this.props.configuration.selectCountry(country)

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
        this.chromaticScale = this.chromaticScale
            .domain([min(allValues), max(allValues)])
            .range([0.3, 1.0])
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
        return `rgba(255, 0, 0, ${this.chromaticScale(aggregatedValue)})`;
    }

    private getCountryColor (country: ReactElement<any>):string {
        if (this.props.configuration.selectedVariable) {
            return this.getCountryColorByVariable(country)
        }
        const selectedCountry = this.props.configuration.getSelectedCountry()
        if (!this.props.countriesWithStatisticsCodes.has(country.props.id)) {
            return "lightgrey"
        }
        if (!selectedCountry || selectedCountry.code !== country.props.id) {
            return 'grey'
        }
        return 'red'
    }

    private getStyledCountries() {
        return countriesPaths.map(country => {
            return {
                ...country,
                props: {
                    ...country.props,
                    onClick: this.onCountryClick,
                    fill: this.getCountryColor(country)
                }
            }
        })
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

            </div>
        )
    }
}