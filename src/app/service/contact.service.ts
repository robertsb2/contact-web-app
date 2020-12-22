import { Injectable } from '@angular/core';

import { Contact } from '../model/contact.model';
import * as data from '../data/contacts.json';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private dummyData = (data as any).default as Array<Contact>;
  private inMemoryContactList = this.dummyData;

  constructor() { }

  addContact(contact: Contact): Array<Contact> {
    let contactIndex = -1;
    let uniqueId = '';
    do {
      uniqueId = this.generateRandomId();
      contactIndex = this.inMemoryContactList.findIndex(c => c.id === uniqueId);
    } while (contactIndex !== -1);
    contact.id = uniqueId;
    this.inMemoryContactList.push(contact);
    return this.inMemoryContactList;

  }

  getContactsByUserId(userId: string): Array<Contact> {
    return this.inMemoryContactList;
  }

  updateContact(contact: Contact): Array<Contact> {
    const contactIndex = this.inMemoryContactList.findIndex(c => c.id === contact.id);
    if (contactIndex > -1) {
      this.inMemoryContactList[contactIndex] = contact;
    }
    return this.inMemoryContactList;
  }

  deleteContact(contact: Contact): Array<Contact> {
    const contactIndex = this.inMemoryContactList.findIndex(c => c.id === contact.id);
    if (contactIndex > -1) {
      this.inMemoryContactList.splice(contactIndex, 1);
    }
    return this.inMemoryContactList;
  }

  private generateRandomId(): string {
    let result = '';
    const idLength = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < idLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
