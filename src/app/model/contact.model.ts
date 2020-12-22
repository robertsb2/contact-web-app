export class Contact {
    id: string;
    name: string;
    address: string;
    email: string;
    phone: string;

    constructor();
    constructor(id?: string, name?: string, address?: string, email?: string, phone?: string) {
        this.id = id || '';
        this.name = name || '';
        this.address = address || '';
        this.email = email || '';
        this.phone = phone || '';
    }
}
