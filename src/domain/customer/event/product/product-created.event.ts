import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventDate: any;

  constructor(eventDate: any) {
    this.dateTimeOccurred = new Date();
    this.eventDate = eventDate;
  }
}
