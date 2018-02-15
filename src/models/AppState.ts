import {observable} from "mobx";
import {Country, CountryModel, Wave} from "./Country";
import {ConfigurationModel} from "./Configuration";
import {AllCountriesList} from "../contants/Countries";
import * as wave4statistics from '../data/wave4.final.json'
import * as wave5statistics from '../data/wave5.final.json'
import * as wave6statistics from '../data/wave6.final.json'

export class AppState {
    @observable countries: Array<CountryModel> = [];
    @observable configuration: ConfigurationModel = new ConfigurationModel();
    countriesWithStatisticsCodes: Set<string>;

    constructor() {
        this.loadWave(Wave.Wave4);
    }

    public loadWave(wave: Wave) {
        this.configuration.selectedWave = wave;
        for (let country of this.countries) {
            country.loadWave(wave)
        }
        this.configuration.selectedCountries = [];
        const countriesWithStatistics = AllCountriesList
            .filter(this.isInStatisticsModel)
        this.countries = countriesWithStatistics
            .map(countryEntry => {
                return new CountryModel(countryEntry, this.configuration.selectedWave)
            })
        this.countriesWithStatisticsCodes = new Set(
            countriesWithStatistics.map(country => country.code)
        )
    }

    private isInStatisticsModel = (countryObject: Country): boolean => {
        // return countryObject.code === "PL" || countryObject.code === "RU"
        switch (this.configuration.selectedWave) {
            case Wave.Wave4:
                return wave4statistics.hasOwnProperty(countryObject.code)
            case Wave.Wave5:
                return wave5statistics.hasOwnProperty(countryObject.code)
            case Wave.Wave6:
                return wave6statistics.hasOwnProperty(countryObject.code)

        }
        return  countryObject.code === 'RU' || countryObject.code === 'PL'
    };
}