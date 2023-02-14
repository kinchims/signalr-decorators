### signalr-decorators
## Purpose
SignalR decorators to improve code readability.

## Examples

Default signalR subscribes to methods this way.
`
connection.on("send", data => {
    console.log(data);
});
`
Alternatively you could do it this way
```
public constructor() {
    connection.on("send", this.send);
}

private send(data: any) {

    }
```
With decorators we can define a method in the class to do the same thing; while having the binding in the place as the definition.

``` 
@HubRoute("send")
private myMethod(data:any) {
   console.log(data);
}
  ```
The decorator will map any number of arguments correctly depending on what is sent by the hub. As such the following is also allowed

``` 
@HubRoute("send")
private myMethod(state:string, progress: number) {
   console.log(state, progress);
}
  ```
  
  ##How to use
  ```
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
  ```
  
  The HubConfiguration decorator takes in an object where the key is the property that you wish to set the hub connection to. Its value is the HubConnectionBuilder from which to create the connection. For those whom use decorator dependency injection and don't wish to extend the decorator can do manual method of setup with the following.
  
  ```
  import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { BehaviorSubject, Observable } from "rxjs";
import { HubRoute, initializeRoutes } from "signalr-decorators";

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
  ```
  
  Note the initializeRoutes() function within the constructor. In order for the routes to be mapped this must be called before being able to retrieve data from the connection.
