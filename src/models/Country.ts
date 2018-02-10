import {observable} from "mobx";
import axios from 'axios'
import * as wave4statistics from '../data/wave4.output.json'
import * as wave5statistics from '../data/wave5.output.json'
import * as wave6statistics from '../data/wave6.output.json'
import {Statistics, StatisticsModel} from "./StatisticsModel";

export interface Country {
    name: string;
    code: string;
}

export enum Wave {
    Wave4 = "wave4",
    Wave5 = "wave5",
    Wave6 = "wave6",
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
        this.loadWave(Wave.Wave4)
    }


    public loadWave(wave: Wave) {
        switch (wave){
            case Wave.Wave4:
                return this.statistics = new StatisticsModel(wave4statistics[this.code])
            case Wave.Wave5:
                return this.statistics = new StatisticsModel(wave5statistics[this.code])
            case Wave.Wave6:
                return this.statistics = new StatisticsModel(wave6statistics[this.code])

        }
        this.statistics = new StatisticsModel(wave[this.code])
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