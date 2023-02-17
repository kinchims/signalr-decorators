import { HubConnection } from "@microsoft/signalr";

export function setUpRoutes(obj: any, connection: HubConnection): void {
  const events: { event: string; method: string }[] = Object.getPrototypeOf(obj).routes
  if (!events || events.length === 0) return

  for (const ev of events) {
    connection.on(
      ev.event,
      ((...e: any[]) => {
        ; (obj as any)[ev.method](...e)
      }).bind(obj)
    )
  }
}