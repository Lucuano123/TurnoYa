export class Appointment {

    constructor(
        public date: Date,
        public time: string,
        public customer_name: string,
        public customer_email: string,
        public booked_service: string,
        public status: 'scheduled' | 'completed' | 'canceled'
    ) {}

}
