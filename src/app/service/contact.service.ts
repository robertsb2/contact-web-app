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

  // Creates a unique identifier for the created contact and saves to in memory array
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

  /* Returns in-memory contact list populated with dummy data
     userID would typically be used by the backend, but is ignored for this demo
  */
  getContactsByUserId(userId: string): Array<Contact> {
    return this.inMemoryContactList;
  }

  // Updates existing contact with matching id
  updateContact(contact: Contact): Array<Contact> {
    const contactIndex = this.inMemoryContactList.findIndex(c => c.id === contact.id);
    if (contactIndex > -1) {
      this.inMemoryContactList[contactIndex] = contact;
    }
    return this.inMemoryContactList;
  }

  // Deletes an existing contact with matching id
  deleteContact(contact: Contact): Array<Contact> {
    const contactIndex = this.inMemoryContactList.findIndex(c => c.id === contact.id);
    if (contactIndex > -1) {
      this.inMemoryContactList.splice(contactIndex, 1);
    }
    return this.inMemoryContactList;
  }

  // Generates a random id for new contacts
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
