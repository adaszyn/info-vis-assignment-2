import {observable} from "mobx";
import axios from 'axios'
import * as statistics from '../data/statistics.json'
import {Statistics, StatisticsModel} from "./StatisticsModel";

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
    @observable flagUrl: string;
    @observable statistics: StatisticsModel;

    constructor(country: Country) {
        this.code = country.code;
        this.name = country.name;
        this.statistics = new StatisticsModel(statistics[this.code])
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
            this.flagUrl = response.data.flag;
        } catch (error) {
            console.error(error)
        }
    }
}