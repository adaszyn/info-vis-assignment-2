import * as React from 'react'
import {observer} from "mobx-react";
import {Country, CountryModel} from "../../models/Country";
import {AppState} from "../../models/AppState";
import {Map} from "../map/Map";
import {CountryDetails} from "../settings/CountryDetails";
import DevTools from "mobx-react-devtools";
import './App.css'
import {VariablesSelection} from "../settings/VariablesSelection";
@observer
export class App extends React.Component<{state: AppState}, {}> {
    render() {
        return (
            <div className='container'>
                <div className='left-pane'>
                    <Map configuration={this.props.state.configuration}
                         countriesWithStatisticsCodes={this.props.state.countriesWithStatisticsCodes}
                         countries={this.props.state.countries}/>
                    <VariablesSelection  configuration={this.props.state.configuration}
                                         variables={this.props.state.configuration.variables}/>
                </div>
                <div className='right-pane'>
                    <CountryDetails configuration={this.props.state.configuration} />
                </div>
                <DevTools />
            </div>
        );
    }
};
