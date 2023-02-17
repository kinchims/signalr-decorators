import { HubConnectionBuilder } from "@microsoft/signalr";
export declare function HubConfiguration(options: HubOptions): any;
export interface HubOptions {
    [index: string]: () => HubConnectionBuilder;
}
