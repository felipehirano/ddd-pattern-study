import EventInterface from "./event.interface";

// O EventHandlerInterface vai ser do tipo EventInterface e terá o EventInterface como valor padrão.
// É o cara que irá ser executado quando o evento ocorrer.
export default interface EventHandlerInterface<
  T extends EventInterface = EventInterface
> {
  handle(event: T): void;
}
