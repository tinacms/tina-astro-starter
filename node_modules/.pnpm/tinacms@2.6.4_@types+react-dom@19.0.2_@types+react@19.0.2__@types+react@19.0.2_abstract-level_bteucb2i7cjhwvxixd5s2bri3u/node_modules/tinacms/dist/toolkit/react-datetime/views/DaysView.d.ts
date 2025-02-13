export default class DaysView extends React.Component<any, any, any> {
    static defaultProps: {
        isValidDate: () => boolean;
        renderDay: (props: any, date: any) => React.JSX.Element;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    render(): React.JSX.Element;
    renderNavigation(): React.JSX.Element;
    renderDayHeaders(): React.JSX.Element;
    renderDays(): React.JSX.Element[];
    renderDay(date: any, startOfMonth: any, endOfMonth: any): any;
    renderFooter(): React.JSX.Element;
    _setDate: (e: any) => void;
}
import React from 'react';
