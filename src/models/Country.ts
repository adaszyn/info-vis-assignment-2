import {observable} from "mobx";
import axios from 'axios'

export interface Country {
    name: string;
    code: string;
}

export class CountryModel implements Country{
    @observable name: string;
    @observable code: string;
    @observable population: number;
    @observable area: number;
    @observable currency: string;

    constructor(country: Country) {
        this.code = country.code;
        this.name = country.name;
    }
    async fetchDescription() {
        try {
            const response = await axios.get(`https://restcountries.eu/rest/v2/alpha/${this.code}`)
            this.population = response.data.population;
            this.area = response.data.area;
            this.currency = response.data.currencies[0].name;
        } catch (error) {
            console.error(error)
        }
    }
}