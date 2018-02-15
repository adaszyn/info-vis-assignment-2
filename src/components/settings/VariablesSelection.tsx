import * as React from 'react'
import {VariableModel} from "../../models/VariableModel";
import {observer} from "mobx-react";
import {ConfigurationModel} from "../../models/Configuration";
import "./VariablesSelection.css"
import {Wave} from "../../models/Country";
import {values} from "d3-collection";

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
    private getWaveText (wave: Wave):string {
        switch (wave) {
            case Wave.Wave4: return 'Wave 4 - 1999 - 2004'
            case Wave.Wave5: return 'Wave 5 - 2005 - 2009'
            case Wave.Wave6: return 'Wave 6 - 2010 - 2014'
            default: return '';
        }
    }
    public render () {
        return (
            <div className="variables-selection-buttons">
                {this.props.variables.map(this.renderButton)}
                <div className="range-slider">
                    <input className="range-slider__range" type="range" defaultValue="0" step={1} min={0} max={2}
                           onChange={this.onRangeChange}/>
                </div>
                <div className="range-slider-value">
                    {this.getWaveText(this.props.configuration.selectedWave)}
                </div>
            </div>
        )
    }
}
