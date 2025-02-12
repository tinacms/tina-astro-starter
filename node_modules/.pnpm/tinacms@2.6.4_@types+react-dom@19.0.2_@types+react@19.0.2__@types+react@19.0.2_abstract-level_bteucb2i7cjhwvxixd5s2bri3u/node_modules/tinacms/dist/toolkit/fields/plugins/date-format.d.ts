import type { DatetimepickerProps } from 'react-datetime';
export declare const DEFAULT_DATE_DISPLAY_FORMAT = "MMM DD, YYYY";
export declare const DEFAULT_TIME_DISPLAY_FORMAT = "h:mm A";
export declare const format: (val: string, _name: string, field: DatetimepickerProps) => string;
export declare const parse: (val: string) => string;
