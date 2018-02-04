import * as React from 'react'
import {observer} from "mobx-react";
import {Country, CountryModel} from "../../models/Country";
import {AppState} from "../../models/AppState";
import {Map} from "../map/Map";
import {VariablesSelection} from "../settings/VariablesSelection";
import DevTools from "mobx-react-devtools";
import './App.css'
@observer
export class App extends React.Component<{state: AppState}, {}> {
    render() {
        return (
            <div className='container'>
                <div className='left-pane'>
                    <Map configuration={this.props.state.configuration}
                         countries={this.props.state.countries}/>
                </div>
                <div className='right-pane'>
                    <VariablesSelection configuration={this.props.state.configuration} />
                </div>
                <DevTools />
            </div>
        );
    }
};
