export default class TimeView extends React.Component<any, any, any> {
    constructor(props: any);
    constraints: {};
    state: {
        hours: string;
        minutes: string;
        seconds: string;
        milliseconds: string;
        ampm: string;
    };
    render(): React.JSX.Element;
    renderCounter(type: any, value: any): React.JSX.Element;
    renderHeader(): React.JSX.Element;
    onStartClicking(e: any, action: any, type: any): void;
    timer: NodeJS.Timeout;
    increaseTimer: NodeJS.Timeout;
    mouseUpListener: any;
    toggleDayPart(): void;
    increase(type: any): string;
    decrease(type: any): string;
    getCounters(): string[];
    isAMPM(): boolean;
    getTimeParts(date: any): {
        hours: string;
        minutes: string;
        seconds: string;
        milliseconds: string;
        ampm: string;
    };
    componentDidUpdate(prevProps: any): void;
}
import React from 'react';
