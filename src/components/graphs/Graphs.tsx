import * as React from 'react'
import {observer} from "mobx-react";
import {StatisticsModel} from "../../models/StatisticsModel";
import {BarChart} from "../bar-chart/BarChart";
import {StatisticsColors} from "../../contants/StatiscticsColors";

interface GraphsProps {
    data: StatisticsModel
}

interface GraphsState {
}

@observer
export class Graphs extends React.Component<GraphsProps, GraphsState> {
    public render () {
        return (
            <div>
                <BarChart
                    baseColor={StatisticsColors.EDUCATION}
                    label="Education"
                    data={this.props.data.education}/>
                <BarChart
                    baseColor={StatisticsColors.HEALTH_STATE}
                    label="Health State"
                    data={this.props.data.healthState}/>
                <BarChart
                    baseColor={StatisticsColors.TRADITION_HIGH_TECH}
                    label="Tradition vs. High Tech"
                    data={this.props.data.traditionHighTech}/>
                <BarChart
                    baseColor={StatisticsColors.FINANCIAL_SATISFACTION}
                    label="Financial Satisfaction"
                    data={this.props.data.financialSatisfaction}/>
                <BarChart
                    baseColor={StatisticsColors.IMMIGRATION}
                    label="Immigration"
                    data={this.props.data.immigration}/>
                <BarChart
                    baseColor={StatisticsColors.RELIGION_IMPORTANCE}
                    label="Religion Importance"
                    data={this.props.data.religionImportance}/>
                <BarChart
                    baseColor={StatisticsColors.LIFE_SATISFACTION}
                    label="Life satisfaction"
                    data={this.props.data.lifeSatisfaction}/>
                <BarChart
                    baseColor={StatisticsColors.TRUST_IN_PEOPLE}
                    label="Trust in people."
                    data={this.props.data.trustInPeople}/>
            </div>
        )
    }
}
