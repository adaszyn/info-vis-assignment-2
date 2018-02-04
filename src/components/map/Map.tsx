import * as React from 'react';
import {Country, CountryModel} from "../../models/Country";
import {observer} from "mobx-react";
import * as worldMap from '../../assets/world.svg'
import './Map.css'
import {AllCountriesList} from "../../contants/Countries";
import {ConfigurationModel} from "../../models/Configuration";
import {countriesPaths} from "./CountriesPaths";
import {ReactElement} from "react";

interface MapProps {
    countries: Array<CountryModel>;
    configuration: ConfigurationModel
}

@observer
export class Map extends React.Component<MapProps, any> {
    private objectElement: HTMLObjectElement;
    private svgElement: HTMLElement;

    constructor(props) {
        super(props);
    }

    // private onMapClick = (event) => {
    //     const id: string = event.target.id;
    //     const [country] = this.props.countries.filter(country => country.code === id)
    //     this.props.configuration.selectCountry(country)
    // }
    // public onMapObjectLoaded = () => {
    //     this.svgElement = this.objectElement.contentDocument.getElementById('world-map-image-svg')
    //     this.svgElement.addEventListener('click', this.onMapClick);
    // }
    // public componentWillUnmount() {
    //     this.svgElement.removeEventListener('click', this.onMapClick);
    // }

    private onCountryClick = ({target: {id}}) => {
        const [country] = this.props.countries.filter(country => country.code === id)
        country.fetchDescription()
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

    // mapCountriesToComponents (countries) {
    //     const selectedCountries = this.props.configuration.getSelectedCountry()
    //     return countries.map(country => {
    //         if (country.props.id === selectedCountry.code) {
    //             country.props.style.fill = 'red'
    //         } else {
    //             country.props.style.fill = 'blue'
    //         }
    //         return country
    //     })
    // }

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