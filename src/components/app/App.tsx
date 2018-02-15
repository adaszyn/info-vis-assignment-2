import * as React from 'react'
import {observer} from "mobx-react";
import {Country, CountryModel, Wave} from "../../models/Country";
import {AppState} from "../../models/AppState";
import {Map} from "../map/Map";
import {CountryDetails} from "../settings/CountryDetails";
// import DevTools from "mobx-react-devtools";
import './App.css'
import {VariablesSelection} from "../settings/VariablesSelection";
import {ParallelCoordChart} from "../parallel-coord-chart/ParallelCoordChart";
import {AboutView} from "../about/AboutView";

@observer
export class App extends React.Component<{ state: AppState }, {}> {
    private onCountrySelect = (country: CountryModel) => {
        this.props.state.configuration.selectCountry(country);
    }
    private onWaveSelect = (wave: Wave): void => {
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
                    <p>
                        Every year The World Values Survey organization conducts a study about values, preferences and
                        behaviours of people all around the globe. This interactive document visualizes changes that
                        have happened in Europe during last 20 years using both WVS and Gapminder data.
                    </p>
                    <p>
                        By clicking on “Politics important” button we can the average importance of politics in each
                        country. We see that people from Hungary, Slovenia and Romania answered that politics are
                        crucial for them.

                    </p>
                    <Map configuration={this.props.state.configuration}
                         countriesWithStatisticsCodes={this.props.state.countriesWithStatisticsCodes}
                         countries={this.props.state.countries}/>
                    <VariablesSelection configuration={this.props.state.configuration}
                                        onWaveChange={this.onWaveSelect}
                                        variables={this.props.state.configuration.allVariables}/>

                    <p>
                        Let’s see if high interest in politics correlate with the national pride. While holding Ctrl key
                        click on those countries. Parallel coordinates chart should highlight lines corresponding to
                        these countries. We can see that there’s no direct correlation between those two variables.
                    </p>
                    <p>

                    Do you wanna see the most dense areas in Europe? Click “Population Density” button. If you are not
                    sure about some country, click on it and check its name on the bottom of the page.
                    </p>
                    <p>

                        Now, let’s inspect the average life expectancy in Europe. Click on the “Life expectancy” button.
                        It is clear that people live longer (on average) in the western parts of Europe. With the help
                        of time slider we can see how the metric has during last 20 years. Slide the slider to the right
                        to see the progress of life expectancy in Europe.
                    </p>
                    <p>

                        If you want to check the detailed information about some country, click on the map (without Ctrl
                        key). At the bottom of the page you will see the current population, currency and flag of the
                        selected country.

                    </p>

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
                    <CountryDetails configuration={this.props.state.configuration}/>

                </div>
                <AboutView/>
                {/*<DevTools/>*/}
            </div>
        );
    }
};
