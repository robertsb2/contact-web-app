import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model';
import * as data from '../data/contacts.json';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  getContactsById(userId: string): Array<Contact> {
    const contacts = (data as any).default as Array<Contact>;
    return contacts;
  }
}
