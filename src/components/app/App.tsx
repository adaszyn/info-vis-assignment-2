import * as React from 'react'
import {observer} from "mobx-react";
import {Country, CountryModel, Wave} from "../../models/Country";
import {AppState} from "../../models/AppState";
import {Map} from "../map/Map";
import {CountryDetails} from "../settings/CountryDetails";
import DevTools from "mobx-react-devtools";
import './App.css'
import {VariablesSelection} from "../settings/VariablesSelection";
import {ParallelCoordChart} from "../parallel-coord-chart/ParallelCoordChart";
import {AboutView} from "../about/AboutView";
@observer
export class App extends React.Component<{state: AppState}, {}> {
    private onCountrySelect = (country: CountryModel) => {
        this.props.state.configuration.selectCountry(country);
    }
    private onWaveSelect = (wave: Wave):void => {
        this.props.state.loadWave(wave)
    }
    render() {
        return (
            <div className='container'>
                <header className="header">
                    <h1>Europe Statistics</h1>
                    <h3>Based of WVS and Gapminder data</h3>
                </header>
                <hr/>
                <div>
                    <Map configuration={this.props.state.configuration}
                         countriesWithStatisticsCodes={this.props.state.countriesWithStatisticsCodes}
                         countries={this.props.state.countries}/>
                    <VariablesSelection  configuration={this.props.state.configuration}
                                         onWaveChange={this.onWaveSelect}
                                         variables={this.props.state.configuration.allVariables}/>

                </div>
                <div>
                    <ParallelCoordChart
                        onCountrySelect={this.onCountrySelect}
                        countries={this.props.state.countries}
                        configuration={this.props.state.configuration}
                        variables={this.props.state.configuration.allVariables}
                    />
                </div>
                <div>
                    <CountryDetails configuration={this.props.state.configuration} />

                </div>
                <AboutView />
                <DevTools />
            </div>
        );
    }
};
