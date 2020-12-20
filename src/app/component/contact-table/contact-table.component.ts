import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from 'src/app/model/contact.model';
import { UserService } from 'src/app/service/user.service';
import { ContactService } from 'src/app/service/contact.service';
import { Subscription } from 'rxjs';

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
    private userService: UserService
  ) {
    this._currentUser$ = this.userService._currentUser.subscribe(
      data => {
        if (data) {
          this.contacts = this.contactService.getContactsById(data.id).sort((a, b) => a.name.localeCompare(b.name));
          this.filteredContacts = this.contacts;        }
      }
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this._currentUser$.unsubscribe();
  }

  applySearchFilter(): void {
    this.filteredContacts = this.contacts.filter((data) =>  JSON.stringify(data)
    .toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1);
  }

}
