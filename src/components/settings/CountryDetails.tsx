import * as React from 'react'
import {ConfigurationModel} from "../../models/Configuration";
import {observer} from "mobx-react";
import {Graphs} from "../graphs/Graphs";
import * as numeral from 'numeral';

import "./CountryDetails.css"

interface VariablesSelectionProps {
    configuration: ConfigurationModel
}

@observer
export class CountryDetails extends React.Component<VariablesSelectionProps, any> {
    public render() {
        const selectedCountries = this.props.configuration.selectedCountries
        if (selectedCountries.length !== 1) {
            return <h2>Select one country to see more details.</h2>;
        }
        const selectedCountry = selectedCountries[0];
        const flagStyle = {
            backgroundImage: `url(${selectedCountry.flagUrl})`
        }
        const {population, name, area, currency} = selectedCountry;
        const formattedArea = numeral(area).format('0,0,0')
        const formattedPopulation = numeral(population).format('0,0,0')
        return (
            <div className="country-details">
                <div className="country-details__box">

                    <h2>
                        {name}
                    </h2>

                    <ul>
                        <li>{formattedPopulation} inhabitants</li>
                        <li>{formattedArea} km²</li>
                        <li>{currency}</li>
                    </ul>
                    <div className="country-flag" style={flagStyle}/>
                </div>

                <div className="country-details__right-pane">
                </div>
                <Graphs data={selectedCountry.statistics}/>
            </div>
        )
    }
}
