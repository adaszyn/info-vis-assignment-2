import {observable, toJS} from "mobx";
import {Country, CountryModel, Wave} from "./Country";
import {VariableModel} from "./VariableModel";

export class ConfigurationModel {
    @observable
    public selectedCountries: Array<CountryModel> = [];
    @observable
    public selectedVariable: VariableModel;
    @observable selectedWave: Wave;

    public variables: Array<VariableModel> =  [
        new VariableModel('politicsImportant', 'Politics Important'),
        new VariableModel('religionImportance', 'Religion Importance'),
        new VariableModel('familyImportant', 'Politics Important'),
        new VariableModel('friendsImportant', 'Friends Important'),
        new VariableModel('workImportant', 'Work Important'),
        new VariableModel('proudNationality', 'Proud Nationality'),
        new VariableModel('healthState', 'Health State'),
        new VariableModel('politicalParty', 'Political Party'),
    ]

    public selectCountry(country: CountryModel) {
        this.selectedCountries.push(country)
    }
    public toggleCountry(country: CountryModel) {
        if (this.isCountrySelected(country)) {
            this.unselectCountry(country)
        } else {
            this.selectCountry(country)
        }
    }
    public unselectCountry(country: CountryModel) {
        const index = this.selectedCountries.indexOf(country)
        this.selectedCountries.splice(index, 1)
    }

    public getSelectedCountries(): Array<Country> {
        return this.selectedCountries
    }
    public isCountrySelected(country: CountryModel):boolean {
        return this.selectedCountries.indexOf(country) > -1
    }
    public isCountrySelectedById(countryId: string):boolean {
        return this.selectedCountries
            .some(country => country.code === countryId)
    }
}