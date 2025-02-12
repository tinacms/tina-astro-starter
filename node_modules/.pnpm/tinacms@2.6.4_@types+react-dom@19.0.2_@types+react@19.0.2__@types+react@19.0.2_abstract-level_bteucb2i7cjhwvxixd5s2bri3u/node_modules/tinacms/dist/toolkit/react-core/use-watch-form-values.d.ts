import { Form } from '../forms';
import { FormSubscriber } from 'final-form';
/**
 * Subscribes to value updates from the form with the given callback.
 */
export declare function useWatchFormValues(form: Form | undefined, cb: FormSubscriber<any>): void;
