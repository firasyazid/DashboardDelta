import { Component, OnInit } from '@angular/core';
import {Commercial, User, Livraison , UsersService} from '@eshop/products';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { ActivatedRoute } from '@angular/router';
 import { DatePipe } from '@angular/common';

@Component({
  selector: 'admin-com',
  templateUrl: './commercial-form.component.html',
  styleUrls: ['./commercial-form.component.css']
})
export class CommercialFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  currentUserId!: string;
  editmode = false;
  commercials: Commercial = new Commercial(); 
  constructor(
    private usersService: UsersService,
    private router: Router,
    private messageService : MessageService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      fullName: ['',Validators.required],
      Phone: ['', [Validators.required]],
     });
  }

  get userForm() {
    return this.form.controls;
  }


  onCancle() {
    this.location.back();
  }


  update(devis: Commercial) {
    this.usersService.updateCommercial(devis).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'commercial is updated!'
        });
        this.router.navigateByUrl('/commercials');
              },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'commercial is not updated!'
        });
      }
    );
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: Commercial = {
      id: this.currentUserId,
      fullName: this.userForm['fullName'].value,
      Phone: this.userForm['Phone'].value,  
     };
       this.update(user);
     
  }

  _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.usersService.getcommercialid(params['id']).subscribe((user) => {
          this.form.patchValue(user); 
          this.userForm['fullName'].setValue(user.fullName);
          this.userForm['Phone'].setValue(user.Phone);
 
 
         });
      }
    });
  }


}
