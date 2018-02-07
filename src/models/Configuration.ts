import {observable} from "mobx";
import {Country, CountryModel} from "./Country";
import {VariableModel} from "./VariableModel";

export class ConfigurationModel {
    @observable
    public selectedCountry: CountryModel;
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
        this.selectedCountry = country;
    }

    public getSelectedCountry(): Country {
        return this.selectedCountry
    }
}