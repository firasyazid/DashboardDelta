import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User } from '@eshop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: []
})
export class UsersFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentUserId!: string;
  countries = [];

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]], 
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [],
      validation : [],
      cin: [],
      patente: [],
     });
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!'
        });
      }
    );
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.usersService.getUser(params['id']).subscribe((user) => {
          this.userForm['name'].setValue(user.name);
          this.userForm['email'].setValue(user.email);
          this.userForm['phone'].setValue(user.phone);
          this.userForm['isAdmin'].setValue(user.isAdmin);
          this.userForm['validation'].setValue(user.validation);
          this.userForm['cin'].setValue(user.cin);
          this.userForm['patente'].setValue(user.patente);
       this.userForm['password'].setValue(user.password);
          this.userForm['password'].updateValueAndValidity();
        });
      }
    });
  }
  isPasswordValid(): boolean {
    const password = this.userForm['password'].value;
    const isValid = password && password.length >= 8;
    if (!isValid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Le mot de passe doit contenir au moins 8 caractères.'
      });
    }
    return isValid;
  }
  
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid || !this.isPasswordValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Le mot de passe doit contenir au moins 8 caractères.'
      });
      return;
    }
      const user: User = {
      id: this.currentUserId,
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      validation: this.userForm['validation'].value,
       password: this.userForm['password'].value,
      cin: this.userForm['cin'].value,
      patente: this.userForm['patente'].value,
    };
    if (this.editmode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }

  onCancle() {
    this.location.back();
  }

  get userForm() {
    return this.form.controls;
  }
}
