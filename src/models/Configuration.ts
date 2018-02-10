import {observable} from "mobx";
import {Country, CountryModel} from "./Country";
import {VariableModel} from "./VariableModel";

export class ConfigurationModel {
    @observable
    public selectedCountries: Array<CountryModel> = [];
    @observable
    public selectedVariable: VariableModel;
    public variables: Array<VariableModel> =  [
        new VariableModel('immigration', 'Immigration'),
        new VariableModel('religionImportance', 'Religion Importance'),
        new VariableModel('lifeSatisfaction', 'Life Satisfaction'),
        new VariableModel('financialSatisfaction', 'Financial Satisfaction'),
        new VariableModel('trustInPeople', 'Trust in people'),
        new VariableModel('education', 'Education'),
        new VariableModel('healthState', 'Health State'),
        new VariableModel('traditionHighTech', 'Tradition vs High Tech'),
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