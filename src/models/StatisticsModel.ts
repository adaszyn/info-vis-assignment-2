export type CategoricalData<T> = Map<string, T>;
export type CategoricalNumeralValues = CategoricalData<number>;

export interface Statistics {
    religionImportance: CategoricalData<number>
    lifeSatisfaction: CategoricalData<number>;
    financialSatisfaction: CategoricalData<number>;
    imigration: CategoricalData<number>;
    trustInPeople: CategoricalData<number>;
    traditionHighTech: CategoricalData<number>;
    education: CategoricalData<number>;
    healthState: CategoricalData<number>;
}

export class StatisticsModel implements Statistics {
    religionImportance: CategoricalData<number>;
    lifeSatisfaction: CategoricalData<number>;
    financialSatisfaction: CategoricalData<number>;
    imigration: CategoricalData<number>;
    trustInPeople: CategoricalData<number>;
    traditionHighTech: CategoricalData<number>;
    education: CategoricalData<number>;
    healthState: CategoricalData<number>;

    constructor(statisticsObject: any) {
        this.religionImportance = this.objectToMap(statisticsObject['religion_importance'])
        this.lifeSatisfaction = this.objectToMap(statisticsObject['life_satisfaction'])
        this.financialSatisfaction = this.objectToMap(statisticsObject['financial_satisfaction'])
        this.imigration = this.objectToMap(statisticsObject['immigration'])
        this.trustInPeople = this.objectToMap(statisticsObject['trust_in_people'])
        this.traditionHighTech = this.objectToMap(statisticsObject['religion_importance'])
        this.education = this.objectToMap(statisticsObject['education'])
        this.healthState = this.objectToMap(statisticsObject['health_state'])
    }

    private objectToMap(object: any):Map<string, any> {
        return new Map(<[string, any]>Object.keys(object).map(key => [key, object[key]]))
    }
}