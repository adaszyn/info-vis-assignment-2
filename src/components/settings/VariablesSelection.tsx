import * as React from 'react'
import {ConfigurationModel} from "../../models/Configuration";
import {observer} from "mobx-react";

interface VariablesSelectionProps {
    configuration: ConfigurationModel
}

@observer
export class VariablesSelection extends React.Component<VariablesSelectionProps, any> {
    public render () {
        console.log(this.props);
        const selectedCountry = this.props.configuration.selectedCountry
        if (!selectedCountry) {
            return null
        }
        return (
            <div>
                <p>POPULATION: {selectedCountry.population}</p>
                <p>AREA: {selectedCountry.area}</p>
                <p>CURRENCY: {selectedCountry.currency}</p>
            </div>
        )
    }
}
