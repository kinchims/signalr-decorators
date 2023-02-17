import { HubConnectionBuilder } from "@microsoft/signalr";
import { setUpRoutes } from "../helpers/setup-routes";

export function HubConfiguration(
    options: HubOptions
): any {
    return function f(target: Type<any>) {
        const keys = Object.keys(options);

        if (keys.length > 1)
            throw "Only one hub connected accepted";

        return class extends target {
            public constructor() {
                super();

                for (const prop in options) {
                    const builder = options[prop]();
                    const connection = builder.build();
                    setUpRoutes(this, connection);
                    this[prop] = connection;
                    Object.getPrototypeOf(this).__connection = connection;
                }
            }
        }
    }
}

type Type<T extends any> = new (...args: any[]) => T;

export interface HubOptions {
    [index: string]: () => HubConnectionBuilder;
}