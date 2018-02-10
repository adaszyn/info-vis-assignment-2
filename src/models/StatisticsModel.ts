export type CategoricalData<T> = Map<string, T>;
export type CategoricalNumeralValues = CategoricalData<number>;

    //
    // religion_importance: header6.indexOf('V9'),
    // familyImportant: header6.indexOf('V4'),
    // friends_important: header6.indexOf('V5'),
    // politics_important: header6.indexOf('V7'),
    // work_important: header6.indexOf('V8'),
    // health_state: header6.indexOf('V11'),
    // proud_nationality: header6.indexOf('V211'),
    // political_party: header6.indexOf('V29'),

export interface Statistics {
    religionImportance: CategoricalData<number>
    familyImportant: CategoricalData<number>;
    friendsImportant: CategoricalData<number>;
    politicsImportant: CategoricalData<number>;
    workImportant: CategoricalData<number>;
    healthState: CategoricalData<number>;
    proudNationality: CategoricalData<number>;
    politicalParty: CategoricalData<number>;
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

    constructor(statisticsObject: any) {
        if (!statisticsObject) {
            console.log(statisticsObject);
        }
        this.religionImportance = this.objectToMap(statisticsObject['religion_importance'])
        this.familyImportant = this.objectToMap(statisticsObject['family_important'])
        this.friendsImportant = this.objectToMap(statisticsObject['friends_important'])
        this.politicsImportant = this.objectToMap(statisticsObject['politics_important'])
        this.workImportant = this.objectToMap(statisticsObject['work_important'])
        this.politicalParty = this.objectToMap(statisticsObject['political_party'])
        this.proudNationality = this.objectToMap(statisticsObject['proud_nationality'])
        this.healthState = this.objectToMap(statisticsObject['health_state'])
    }

    private objectToMap(object: any):Map<string, any> {
        return new Map(<[string, any]>Object.keys(object).map(key => [key, object[key]]))
    }

    public getAggregatedValue (key:string):number {
        const data:CategoricalNumeralValues = <any>this[key];
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