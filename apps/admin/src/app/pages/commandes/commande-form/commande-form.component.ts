import { Component, OnInit } from '@angular/core';
import { Status, User, Livraison, UsersService, Commande } from '@eshop/products';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'admin-formcmd',
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.css']
})
export class CommandeFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
  currentUserId!: string;
  editmode = false;
  cmd: Commande = new Commande();
  statusValues = Object.values(Status);


  constructor(
    private usersService: UsersService,
    private router: Router,
    private messageService: MessageService,
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
      numCmd: [''],
      montantCmd: [],
      dateCmd: [''],
      showroom: [''],
     });
  }

  get LivrForm() {
    return this.form.controls;
  }
  onCancle() {
    this.location.back();
  }

  _update(livr: Commande) {
    this.usersService.updateCmd(livr).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Commande a été modifiè!'
        });
        this.router.navigateByUrl('/commandes');
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Commande n`a pas été modifiè!'
        });
      }
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }


  const cmd: Commande = {
    id: this.currentUserId,
    numCmd: this.LivrForm['numCmd'].value,
    montantCmd: this.LivrForm['montantCmd'].value,
    user: this.cmd.user,
    devis: this.cmd.devis,
    dateCmd: this.LivrForm['dateCmd'].value,
    showroom: this.cmd.showroom
     
    
   };
     this._update(cmd);
  }


  _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.usersService.getcmdid(params['id']).subscribe((user) => {
           this.LivrForm['numCmd'].setValue(user.numCmd);
           this.LivrForm['montantCmd'].setValue(user.montantCmd);
           this.LivrForm['dateCmd'].setValue(user.dateCmd);
         });
      }
    });
  }



}
