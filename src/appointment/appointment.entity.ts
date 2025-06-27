export class Appointment {

    constructor(
        public date: Date,
        public time: string,
        public custumer_name: string,
        public custumer_email: string,
        public booked_service: string,
        public status: 'scheduled' | 'completed' | 'canceled'
    ) {}

}