export default class MonthsView extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): React.JSX.Element;
    renderNavigation(): React.JSX.Element;
    renderMonths(): React.JSX.Element[];
    renderMonth(month: any): any;
    isDisabledMonth(month: any): boolean;
    getMonthText(month: any): any;
    _updateSelectedMonth: (event: any) => void;
}
import React from 'react';
