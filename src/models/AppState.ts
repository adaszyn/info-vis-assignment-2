import {observable} from "mobx";
import {Country, CountryModel} from "./Country";
import {ConfigurationModel} from "./Configuration";
import {AllCountriesList} from "../contants/Countries";

export class AppState {
    @observable countries: Array<CountryModel> = [];
    @observable configuration: ConfigurationModel = new ConfigurationModel();
    constructor() {
        this.countries = AllCountriesList.map(countryEntry => new CountryModel(countryEntry))
    }
}