export type CategoricalData<T> = Map<string, T>;
export type CategoricalNumeralValues = CategoricalData<number>;

export interface Statistics {
    religionImportance: CategoricalData<number>
    familyImportant: CategoricalData<number>;
    friendsImportant: CategoricalData<number>;
    politicsImportant: CategoricalData<number>;
    workImportant: CategoricalData<number>;
    healthState: CategoricalData<number>;
    proudNationality: CategoricalData<number>;
    politicalParty: CategoricalData<number>;
    populationGrowth: number;
    populationDensity: number
    lifeExpectancy: number;
}

export class StatisticsModel implements Statistics {
    religionImportance: CategoricalData<number>;
    familyImportant: CategoricalData<number>;
    friendsImportant: CategoricalData<number>;
    politicsImportant: CategoricalData<number>;
    workImportant: CategoricalData<number>;
    healthState: CategoricalData<number>;
    proudNationality: CategoricalData<number>;
    politicalParty: CategoricalData<number>;
    populationGrowth: number;
    populationDensity: number;
    lifeExpectancy: number;

    constructor(statisticsObject: any) {
        this.religionImportance = this.objectToMap(statisticsObject['religion_importance'])
        this.familyImportant = this.objectToMap(statisticsObject['family_important'])
        this.friendsImportant = this.objectToMap(statisticsObject['friends_important'])
        this.politicsImportant = this.objectToMap(statisticsObject['politics_important'])
        this.workImportant = this.objectToMap(statisticsObject['work_important'])
        this.politicalParty = this.objectToMap(statisticsObject['political_party'])
        this.proudNationality = this.objectToMap(statisticsObject['proud_nationality'])
        this.healthState = this.objectToMap(statisticsObject['health_state']);
        this.populationGrowth = statisticsObject['population_growth'];
        this.populationDensity = statisticsObject['population_density'];
        this.lifeExpectancy = statisticsObject['life_expectancy'];
    }

    private objectToMap(object: any):Map<string, any> {
        if (!object) {
            return new Map([]);
        }
        return new Map(<[string, any]>Object.keys(object).map(key => [key, object[key]]))
    }

    public getAggregatedValue (key:string):number {
        const data:CategoricalNumeralValues = <any>this[key];
        if (!data) {
            return null;
        }
        if (typeof data === 'number') {
            return data;
        }
        let sum: number = 0;
        let numOfEntries: number = 0;
        for (const label of Array.from(data.keys())) {
            const value = data.get(label)
            if (value <= 0)  {
                continue;
            }
            numOfEntries = numOfEntries + value;
            sum = sum + parseInt(label) * value;
        }
        return sum / numOfEntries;
    }
}