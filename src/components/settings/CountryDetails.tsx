import * as React from 'react'
import {ConfigurationModel} from "../../models/Configuration";
import {observer} from "mobx-react";
import * as data from '../../data/statistics.json'
import {BarChart} from "../bar-chart/BarChart";
import {Graphs} from "../graphs/Graphs";
interface VariablesSelectionProps {
    configuration: ConfigurationModel
}

@observer
export class CountryDetails extends React.Component<VariablesSelectionProps, any> {
    public render () {
        const selectedCountry = this.props.configuration.selectedCountry
        if (!selectedCountry) {
            return "No Selected Country"
        }
        return (
            <div>
                <p>POPULATION: {selectedCountry.population}</p>
                <p>AREA: {selectedCountry.area}</p>
                <p>CURRENCY: {selectedCountry.currency}</p>
                <Graphs data={selectedCountry.statistics}/>
            </div>
        )
    }
}
