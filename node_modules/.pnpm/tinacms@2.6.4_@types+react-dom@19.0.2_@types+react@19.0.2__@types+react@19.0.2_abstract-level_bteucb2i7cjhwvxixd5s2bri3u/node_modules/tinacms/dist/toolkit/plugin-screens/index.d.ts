/**



*/
import { Form } from '../forms';
import { ScreenPlugin } from '../react-screens';
export declare class GlobalFormPlugin implements ScreenPlugin {
    form: Form;
    __type: ScreenPlugin['__type'];
    name: ScreenPlugin['name'];
    Component: ScreenPlugin['Component'];
    Icon: ScreenPlugin['Icon'];
    layout: ScreenPlugin['layout'];
    constructor(form: Form, icon?: ScreenPlugin['Icon'], layout?: ScreenPlugin['layout']);
}
