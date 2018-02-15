import * as React from 'react'
import {VariableModel} from "../../models/VariableModel";
import {observer} from "mobx-react";
import {ConfigurationModel} from "../../models/Configuration";
import "./VariablesSelection.css"
import {Wave} from "../../models/Country";

interface VariablesSelectionProps {
    variables: Array<VariableModel>;
    configuration: ConfigurationModel;
    onWaveChange: (wave: Wave) => void;
}

interface VariablesSelectionState {
}

@observer
export class VariablesSelection extends React.Component<VariablesSelectionProps, VariablesSelectionState> {

    private onRangeChange = ({target: {value}}) => {
        switch (Number(value)) {
            case 0:
                return this.props.onWaveChange(Wave.Wave4)
            case 1:
                return this.props.onWaveChange(Wave.Wave5)
            case 2:
                return this.props.onWaveChange(Wave.Wave6)
        }
    }

    private renderButton = (variable: VariableModel) => {
        const className = this.props.configuration.selectedVariable === variable
            ? 'button selected'
            : 'button'
        return <div className={className}
                    key={`variable-${variable.key}`}
                    onClick={() => this.props.configuration.selectedVariable = variable}>
            { variable.label }
        </div>

    }

    public render () {
        return (
            <div className="variables-selection-buttons">
                { this.props.variables.map(this.renderButton)}
                <input type="range" defaultValue="0" step={1} min={0} max={2} onChange={this.onRangeChange}/>
            </div>
        )
    }
}
