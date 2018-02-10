import {observable} from "mobx";
import {Country, CountryModel} from "./Country";
import {VariableModel} from "./VariableModel";

export class ConfigurationModel {
    @observable
    public selectedCountries: Array<CountryModel> = [];
    @observable
    public selectedVariable: VariableModel;
    // religion_importance: header6.indexOf('V9'),
    // family_important: header6.indexOf('V4'),
    // friends_important: header6.indexOf('V5'),
    // politics_important: header6.indexOf('V7'),
    // work_important: header6.indexOf('V8'),
    // health_state: header6.indexOf('V11'),
    // proud_nationality: header6.indexOf('V211'),
    // political_party: header6.indexOf('V29'),
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