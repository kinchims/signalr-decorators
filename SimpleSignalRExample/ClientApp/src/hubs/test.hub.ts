import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { BehaviorSubject, Observable } from "rxjs";
import { HubConfiguration, HubRoute } from "signalr-decorators";

@HubConfiguration({
  connection: () => {
    const builder = new HubConnectionBuilder().withUrl("/hubs/test");
    return builder;
  },
})
export class TestHub {
  public connection!: HubConnection;

  public progressSingle$: Observable<number> = new BehaviorSubject(0);
  public progressMulti$: Observable<{ state: string, progress: number }> = new BehaviorSubject({ state: 'none', progress: 0 });

  @HubRoute("SendMultiArgumentProgressAsync")
  private multiArgument(state: string, progress: number) {
    (this.progressMulti$ as BehaviorSubject<{ state: string, progress: number }>).next({ state: state, progress: progress });
  }

  @HubRoute("SendProgressAsync")
  private singleArgument(progress: number) {
    (this.progressSingle$ as BehaviorSubject<number>).next(progress);
  }
}
