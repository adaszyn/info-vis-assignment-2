import {observable} from "mobx";
import {Country, CountryModel} from "./Country";

export class ConfigurationModel {
    @observable
    public selectedCountry: CountryModel;

    public selectCountry(country: CountryModel) {
        this.selectedCountry = country;
    }

    public getSelectedCountry(): Country {
        return this.selectedCountry
    }
}