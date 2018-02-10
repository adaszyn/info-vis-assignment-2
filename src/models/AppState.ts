import {observable} from "mobx";
import {Country, CountryModel} from "./Country";
import {ConfigurationModel} from "./Configuration";
import {AllCountriesList} from "../contants/Countries";
import * as statistics from '../data/statistics.json';

export class AppState {
    @observable countries: Array<CountryModel> = [];
    @observable configuration: ConfigurationModel = new ConfigurationModel();
    countriesWithStatisticsCodes: Set<string>;

    constructor() {
        const countriesWithStatistics = AllCountriesList
            .filter(this.isInStatisticsModel)
        this.countries = countriesWithStatistics
            .map(countryEntry => new CountryModel(countryEntry))
        this.countriesWithStatisticsCodes = new Set(
            countriesWithStatistics.map(country => country.code)
        )
    }

    private isInStatisticsModel(countryObject: Country): boolean {
        // return statistics.hasOwnProperty(countryObject.code)
        return  countryObject.code === 'RU' || countryObject.code === 'PL'
    };
}