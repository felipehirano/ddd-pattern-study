import EventInterface from "../../@shared/event/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventDate: any;

  constructor(eventDate: any) {
    this.dateTimeOccurred = new Date();
    this.eventDate = eventDate;
  }
}
