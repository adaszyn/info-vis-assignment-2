import {observable} from "mobx";
import axios from 'axios'
import * as statistics from '../data/statistics.json'

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
    @observable statistics: any;

    constructor(country: Country) {
        this.code = country.code;
        this.name = country.name;
    }
    loadStatistics () {
        this.statistics = statistics[this.code]
    }
    async fetchDescription() {
        if (this.population) {
            return
        }
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