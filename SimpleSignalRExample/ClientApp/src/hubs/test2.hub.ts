import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { BehaviorSubject, Observable } from "rxjs";
import { HubRoute, initializeRoutes, } from "signalr-decorators";

export class TestHub2 {
    public connection!: HubConnection;

    public progressSingle$: Observable<number> = new BehaviorSubject(0);
    public progressMulti$: Observable<{ state: string, progress: number }> = new BehaviorSubject({ state: 'none', progress: 0 });

    public constructor() {
        const builder = new HubConnectionBuilder();
        builder.withUrl("/hubs/test");

        this.connection = builder.build();
        initializeRoutes(this, this.connection);
    }
    
    @HubRoute("SendMultiArgumentProgressAsync")
    private multiArgument(state: string, progress: number) {
        (this.progressMulti$ as BehaviorSubject<{ state: string, progress: number }>).next({ state: state, progress: progress });
    }

    @HubRoute("SendProgressAsync")
    private singleArgument(progress: number) {
        (this.progressSingle$ as BehaviorSubject<number>).next(progress);
    }
}
