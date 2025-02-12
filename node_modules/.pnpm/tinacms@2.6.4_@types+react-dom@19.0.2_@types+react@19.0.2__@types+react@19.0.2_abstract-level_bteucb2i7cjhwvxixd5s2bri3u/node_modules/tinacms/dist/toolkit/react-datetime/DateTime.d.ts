export default class Datetime extends React.Component<any, any, any> {
    static propTypes: {
        value: PropTypes.Requireable<NonNullable<string | Date>>;
        initialValue: PropTypes.Requireable<NonNullable<string | Date>>;
        initialViewDate: PropTypes.Requireable<NonNullable<string | Date>>;
        initialViewMode: PropTypes.Requireable<string>;
        onOpen: PropTypes.Requireable<(...args: any[]) => any>;
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onNavigate: PropTypes.Requireable<(...args: any[]) => any>;
        onBeforeNavigate: PropTypes.Requireable<(...args: any[]) => any>;
        onNavigateBack: PropTypes.Requireable<(...args: any[]) => any>;
        onNavigateForward: PropTypes.Requireable<(...args: any[]) => any>;
        updateOnView: PropTypes.Requireable<string>;
        locale: PropTypes.Requireable<string>;
        utc: PropTypes.Requireable<boolean>;
        displayTimeZone: PropTypes.Requireable<string>;
        input: PropTypes.Requireable<boolean>;
        dateFormat: PropTypes.Requireable<NonNullable<string | boolean>>;
        timeFormat: PropTypes.Requireable<NonNullable<string | boolean>>;
        inputProps: PropTypes.Requireable<object>;
        timeConstraints: PropTypes.Requireable<object>;
        isValidDate: PropTypes.Requireable<(...args: any[]) => any>;
        open: PropTypes.Requireable<boolean>;
        strictParsing: PropTypes.Requireable<boolean>;
        closeOnSelect: PropTypes.Requireable<boolean>;
        closeOnTab: PropTypes.Requireable<boolean>;
        renderView: PropTypes.Requireable<(...args: any[]) => any>;
        renderInput: PropTypes.Requireable<(...args: any[]) => any>;
        renderDay: PropTypes.Requireable<(...args: any[]) => any>;
        renderMonth: PropTypes.Requireable<(...args: any[]) => any>;
        renderYear: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        onOpen: () => void;
        onClose: () => void;
        onCalendarOpen: () => void;
        onCalendarClose: () => void;
        onChange: () => void;
        onNavigate: () => void;
        onBeforeNavigate: (next: any) => any;
        onNavigateBack: () => void;
        onNavigateForward: () => void;
        dateFormat: boolean;
        timeFormat: boolean;
        utc: boolean;
        className: string;
        input: boolean;
        inputProps: {};
        timeConstraints: {};
        isValidDate: () => boolean;
        strictParsing: boolean;
        closeOnSelect: boolean;
        closeOnTab: boolean;
        closeOnClickOutside: boolean;
        renderView: (_: any, renderFunc: any) => any;
    };
    static moment: typeof moment;
    constructor(props: any);
    state: {
        open: boolean;
        currentView: any;
        viewDate: any;
        selectedDate: any;
        inputValue: any;
    };
    render(): React.JSX.Element;
    renderInput(): React.JSX.Element;
    renderView(): any;
    _renderCalendar: () => React.JSX.Element;
    getInitialState(): {
        open: boolean;
        currentView: any;
        viewDate: any;
        selectedDate: any;
        inputValue: any;
    };
    getInitialViewDate(selectedDate: any): any;
    getInitialDate(): any;
    getInitialView(): any;
    parseDate(date: any, dateFormat: any): any;
    getClassName(): string;
    isOpen(): any;
    getUpdateOn(dateFormat: any): any;
    getLocaleData(): any;
    getDateFormat(): any;
    getTimeFormat(): any;
    getFormat(type: any): any;
    _showView: (view: any, date: any) => void;
    updateTime(op: any, amount: any, type: any, toSelected: any): void;
    viewToMethod: {
        days: string;
        months: string;
        years: string;
    };
    nextView: {
        days: string;
        months: string;
        years: string;
    };
    _updateDate: (e: any) => void;
    _viewNavigate: (modifier: any, unit: any) => void;
    _setTime: (type: any, value: any) => void;
    _openCalendar: () => void;
    _closeCalendar: () => void;
    _handleClickOutside: () => void;
    localMoment(date: any, format: any, props: any): any;
    checkTZ(): void;
    tzWarning: boolean;
    componentDidUpdate(prevProps: any): void;
    regenerateDates(): void;
    getSelectedDate(): any;
    getInitialInputValue(selectedDate: any): any;
    getInputValue(): any;
    /**
     * Set the date that is currently shown in the calendar.
     * This is independent from the selected date and it's the one used to navigate through months or days in the calendar.
     * @param dateType date
     * @public
     */
    public setViewDate(date: any): void;
    /**
     * Set the view currently shown by the calendar. View modes shipped with react-datetime are 'years', 'months', 'days' and 'time'.
     * @param TYPES.string mode
     */
    navigate(mode: any): void;
    _onInputFocus: (e: any) => void;
    _onInputChange: (e: any) => void;
    _onInputKeyDown: (e: any) => void;
    _onInputClick: (e: any) => void;
    callHandler(method: any, e: any): boolean;
}
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
