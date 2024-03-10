import { Component, OnInit } from '@angular/core';
import {Status, User, Livraison , UsersService} from '@eshop/products';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { ActivatedRoute } from '@angular/router';
 import { DatePipe } from '@angular/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-updtaeLivr',
  templateUrl: './livraisons-form.component.html',
  styleUrls: ['./livraisons-form.component.css']
})
export class LivraisonsFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
  currentUserId!: string;
  editmode = false;
  livr: Livraison = new Livraison(); 
  statusValues = Object.values(Status);



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
      dateLivraison: [''],
       numLivraison: [],
      montantLivraison: [''],
       });
  }

  get LivrForm() {
    return this.form.controls;
  }
  onCancle() {
    this.location.back();
  }


  _update(livr: Livraison) {
    this.usersService.updateLivr(livr).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Livraison is updated!'
        });
        this.router.navigateByUrl('/livraisons');
              },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'livraisons is not updated!'
        });
      }
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }


    const livr: Livraison = {
      id: this.currentUserId,
      dateLivraison: this.LivrForm['dateLivraison'].value,
       numLivraison: this.LivrForm['numLivraison'].value,
      user: this.livr.user,
      devis: this.livr.devis,
      commande: this.livr.commande,
      montantLivraison: this.LivrForm['montantLivraison'].value,
      
      
     };
       this._update(livr);
     
  }



  _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.usersService.getlivrid(params['id']).subscribe((user) => {
           this.LivrForm['dateLivraison'].setValue(user.dateLivraison);
           this.LivrForm['numLivraison'].setValue(user.numLivraison);
           this.LivrForm['montantLivraison'].setValue(user.montantLivraison);
         });
      }
    });
  }






}
