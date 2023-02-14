import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'

export declare function initializeRoutes(hub: object, connection: HubConnection): void;
export declare function HubConfiguration(options: HubOptions): any;
export declare function HubRoute(route: string): any;

export interface HubOptions {
    [index: string]: () => HubConnectionBuilder;
}