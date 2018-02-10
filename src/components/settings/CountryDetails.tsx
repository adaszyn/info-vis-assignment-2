import * as React from 'react'
import {ConfigurationModel} from "../../models/Configuration";
import {observer} from "mobx-react";
import * as data from '../../data/statistics.json'
import {BarChart} from "../bar-chart/BarChart";
import {Graphs} from "../graphs/Graphs";
import "./CountryDetails.css"

interface VariablesSelectionProps {
    configuration: ConfigurationModel
}

@observer
export class CountryDetails extends React.Component<VariablesSelectionProps, any> {
    public render() {
        const selectedCountry = this.props.configuration.selectedCountry
        if (!selectedCountry) {
            return "No Selected Country"
        }
        const flagStyle = {
            backgroundImage: `url(${selectedCountry.flagUrl})`
        }
        return (
            <div className="country-details">
                <h2>
                    {selectedCountry.name}
                    <div className="country-flag" style={flagStyle}/>
                </h2>
                <ul>
                    <li>{selectedCountry.population} inhabitants</li>
                    <li>{selectedCountry.area} km²</li>
                    <li>{selectedCountry.currency}</li>
                </ul>
                <div className="country-details__right-pane">
                </div>
                <Graphs data={selectedCountry.statistics}/>
            </div>
        )
    }
}
