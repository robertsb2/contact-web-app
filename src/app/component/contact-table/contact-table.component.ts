import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ModalComponent } from './../modal/modal.component';

import { UserService } from 'src/app/service/user.service';
import { ContactService } from 'src/app/service/contact.service';

import { Contact } from 'src/app/model/contact.model';


@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent implements OnInit, OnDestroy {

  private _currentUser$: Subscription;

  headers = ['Name', 'Address', 'Email', 'Phone'];
  searchTerm = '';
  contacts: Array<Contact> = new Array<Contact>();
  filteredContacts: Array<Contact> = new Array<Contact>();


  constructor(
    private contactService: ContactService,
    private userService: UserService,
    public matDialog: MatDialog
  ) {

    /* Subscibes to the UserService to get logged in user.
       User's id is used to query for their contacts */
    this._currentUser$ = this.userService._currentUser.subscribe(
      data => {
        if (data) {
          this.contacts = this.contactService.getContactsByUserId(data.id).sort((a, b) => a.name.localeCompare(b.name));
          this.filteredContacts = this.contacts;
        }
      }
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this._currentUser$.unsubscribe();
  }

  // Apply's a search filter to display contacts with property values that match the search term
  applySearchFilter(): void {
    this.filteredContacts = this.contacts.filter((data) => JSON.stringify(data)
      .toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1);
  }

  /* Opens dialog with form to add new contact.
     Completed forms are send to ContactService for processing
  */
  addContact(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '420px';
    dialogConfig.width = '650px';
    dialogConfig.data = {
      description: 'New Contact'
    };

    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.event === 'submit') {
        this.contacts = this.contactService.addContact(result.data).sort((a, b) => a.name.localeCompare(b.name));
        this.filteredContacts = this.contacts;
      }
    });
  }

  /* Opens dialog with form to edit/delete new contact.
     Completed forms are send to ContactService for processing
  */
  editContact(contactId: string): void {
    const editSubject = this.contacts.find(c => c.id === contactId);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '420px';
    dialogConfig.width = '650px';
    dialogConfig.data = {
      description: 'Edit Contact',
      contact: editSubject
    };

    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.event === 'submit') {
        this.contacts = this.contactService.updateContact(result.data).sort((a, b) => a.name.localeCompare(b.name));
        this.filteredContacts = this.contacts;
      } else if (result.event === 'delete') {
        this.contacts = this.contactService.deleteContact(result.data).sort((a, b) => a.name.localeCompare(b.name));
        this.filteredContacts = this.contacts;
      }
    });
  }

}
