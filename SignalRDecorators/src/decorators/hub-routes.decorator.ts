export function HubRoute(route: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const proto = Object.getPrototypeOf(target);
    const data: { event: string, method: string }[] = proto.routes || [];

    Object.setPrototypeOf(target, { ...proto, routes: [...data, { event: route, method: propertyKey }] });
  }
}