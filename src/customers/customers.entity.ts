export class Customer {

    constructor(
        public id: number,
        public email: string,
        public first_name: string,
        public last_name: string,
        private password: string,
        public phone: number,
        public birth_date: Date,
        public status: 'pending' | 'approved' | 'rejected',
        public role: 'customer' | 'professional',
        public created_at: Date,
        public updated_at: Date,
    ) { }

}

