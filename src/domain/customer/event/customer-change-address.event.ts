import EventInterface from "../../@shared/event/event.interface";

type AddressCustomer = {
  id: string;
  name: string;
  street: string;
  number: number;
  zip: string;
  city: string;
};

export default class CustomerChangeAddressEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventDate: AddressCustomer;

  constructor(eventDate: AddressCustomer) {
    this.dateTimeOccurred = new Date();
    this.eventDate = eventDate;
  }
}
