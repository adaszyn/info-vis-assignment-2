import * as React from 'react';
import {CountryModel} from "../../models/Country";
import {observer} from "mobx-react";
import {ConfigurationModel} from "../../models/Configuration";
import {countriesPaths} from "./CountriesPaths";
import './Map.css'

interface MapProps {
    countries: Array<CountryModel>;
    configuration: ConfigurationModel
}

@observer
export class Map extends React.Component<MapProps, any> {
    constructor(props) {
        super(props);
    }
    private onCountryClick = ({target: {id}}) => {
        const [country] = this.props.countries.filter(country => country.code === id)
        country.fetchDescription()
        country.loadStatistics()
        this.props.configuration.selectCountry(country)

    }
    private getStyledCountries() {
        const selectedCountry = this.props.configuration.getSelectedCountry()
        return countriesPaths.map(country => {
            return {
                ...country,
                props: {
                    ...country.props,
                    onClick: this.onCountryClick,
                    fill: selectedCountry && selectedCountry.code === country.props.id
                        ? 'red' : 'grey'
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