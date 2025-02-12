export default class YearsView extends React.Component<any, any, any> {
    static defaultProps: {
        renderYear: (props: any, year: any) => React.JSX.Element;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    render(): React.JSX.Element;
    renderNavigation(): React.JSX.Element;
    renderYears(): React.JSX.Element[];
    renderYear(year: any): any;
    getViewYear(): number;
    getSelectedYear(): any;
    disabledYearsCache: {};
    isDisabledYear(year: any): any;
    _updateSelectedYear: (event: any) => void;
}
import React from 'react';
