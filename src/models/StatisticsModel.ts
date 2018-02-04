type CategoricalData<T> = Map<string, T>;

export class StatisticsModel {
    religionImportance: CategoricalData<number>
    lifeSatisfaction: CategoricalData<number>;
    financialSatisfaction: CategoricalData<number>;
    imigration: CategoricalData<number>;
    trustInPeople: CategoricalData<number>;
    traditionHighTech: CategoricalData<number>;
    education: CategoricalData<number>;
    healthState: CategoricalData<number>;
}