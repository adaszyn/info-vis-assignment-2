import * as React from 'react';
import {Country, CountryModel} from "../../models/Country";
import {observer} from "mobx-react";
import {ConfigurationModel} from "../../models/Configuration";
import {countriesPaths} from "./CountriesPaths";
import './Map.css'
import {ReactElement} from "react";

interface MapProps {
    countries: Array<CountryModel>;
    configuration: ConfigurationModel;
    countriesWithStatisticsCodes: Set<string>;
}

@observer
export class Map extends React.Component<MapProps, any> {
    constructor(props) {
        super(props);
    }
    private onCountryClick = ({target: {id}}) => {
        const [country] = this.props.countries.filter(country => country.code === id)
        country.fetchDescription()
        this.props.configuration.selectCountry(country)

    }

    private getCountryColor (country: ReactElement<any>):string {
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