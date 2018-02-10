import * as React from 'react'
import {VariableModel} from "../../models/VariableModel";
import {observer} from "mobx-react";
import {ConfigurationModel} from "../../models/Configuration";
import "./VariablesSelection.css"

interface VariablesSelectionProps {
    variables: Array<VariableModel>;
    configuration: ConfigurationModel;
}

interface VariablesSelectionState {
}

@observer
export class VariablesSelection extends React.Component<VariablesSelectionProps, VariablesSelectionState> {

    private renderButton = (variable: VariableModel) => {
        const className = this.props.configuration.selectedVariable === variable
            ? 'button selected'
            : 'button'
        return <div className={className}
                    onClick={() => this.props.configuration.selectedVariable = variable}>
            { variable.label }
        </div>

    }
    public render () {
        return (
            <div className="variables-selection-buttons">
                { this.props.variables.map(this.renderButton)}
            </div>
        )
    }
}
