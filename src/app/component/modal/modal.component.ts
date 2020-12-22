import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Contact } from 'src/app/model/contact.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  description: string;
  contact: Contact;
  existingContact = true;

  form: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.contact = data.contact;
    if (this.contact === undefined || null) {
      this.contact = new Contact();
      this.existingContact = false;
    }
    this.description = data.description;
    this.form = new FormGroup({
      id: new FormControl(this.contact.id),
      name: new FormControl(this.contact.name),
      address: new FormControl(this.contact.address),
      email: new FormControl(this.contact.email),
      phone: new FormControl(this.contact.phone)
    });
  }

  ngOnInit(): void {
  }


  onSubmit(): void {
    this.dialogRef.close({event: 'submit', data: this.form.value as Contact});
  }

  closeModal(): void {
    this.dialogRef.close({event: 'cancel'});
  }

  deleteContact(): void{
    this.dialogRef.close({event: 'delete', data: this.contact});
  }

}
