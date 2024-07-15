declare module "graphql-subscriptions" {
  import { PubSubEngine } from "graphql-subscriptions";

  export class PubSub implements PubSubEngine {
    constructor(options?: any);
    asyncIterator<T>(triggers: string | string[]): AsyncIterator<T>;
    publish(triggerName: string, payload: any): boolean;
    subscribe(
      triggerName: string,
      onMessage: Function,
      options?: Object
    ): number;
    unsubscribe(subId: number): void;
  }
}
