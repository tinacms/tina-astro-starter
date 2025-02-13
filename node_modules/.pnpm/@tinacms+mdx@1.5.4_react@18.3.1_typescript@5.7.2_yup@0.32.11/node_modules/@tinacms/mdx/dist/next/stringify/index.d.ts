import { RichTextField } from '@tinacms/schema-tools';
import type * as Plate from '../../parse/plate';
export declare const stringifyMDX: (value: Plate.RootElement, field: RichTextField, imageCallback: (url: string) => string) => string | undefined;
