import { Component, OnInit } from '@angular/core';
import { Devis,ProduitsService ,Status, Commercial,UsersService,Showroom} from '@eshop/products';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { ActivatedRoute } from '@angular/router';
 import { DatePipe } from '@angular/common';

@Component({
  selector: 'admin-devis',
  templateUrl: './devis-form.component.html',
  styleUrls: ['./devis-form.component.css'],
  providers: [MessageService, DatePipe]
})
export class DevisFormComponent implements OnInit {
  form!: FormGroup;
   isSubmitted = false;
   currentUserId!: string;
   editmode = false;
   devis: Devis = new Devis(); 
   statusValues = Object.values(Status);


   commercialOptions: Commercial[] = [];
   selectedCommercial: Commercial;
 
 
   showroomOptions: Showroom[] = [];
   selectedShowroom: Showroom;
   


  constructor(
    
    private produitsService: ProduitsService,
    private router: Router,
    private messageService : MessageService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private userService: UsersService,

    ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();
    this.loadCommercialOptions();
    this.ShowroomOptions();
 
  }

  ShowroomOptions() {
    this.userService.getShowroom().subscribe(
      (options: Showroom[]) => {
        this.showroomOptions = options;
        console.log('showroom options', options);
      },
      (error) => {
        console.error('Failed to load showroom options', error);
      }
    );
    }
      
  loadCommercialOptions() {
    this.userService.getCommercial().subscribe(
      (options: Commercial[]) => {
        this.commercialOptions = options;
        console.log('commercial options', options);
      },
      (error) => {
        console.error('Failed to load commercial options', error);
      }
    );
  }
   
  
  private _initUserForm() {
    this.form = this.formBuilder.group({
      dateDevis: [''],
      status: ['',Validators.required],
      montant: ['', [Validators.required]],
      numDevis: [],
      client: [],
      commercial: [],
      user : [],
      showroom: [],
     });
  }

   
  get userForm() {
    return this.form.controls;
  }
  onCancle() {
    this.location.back();
  }


  _update(devis: Devis) {
    this.produitsService.updateDevis(devis).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'devis is updated!'
        });
        this.router.navigateByUrl('/stat');
              },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'devis is not updated!'
        });
      }
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: Devis = {
      id: this.currentUserId,
      dateDevis: this.userForm['dateDevis'].value,
      status: this.userForm['status'].value,  
      montant: this.userForm['montant'].value,
      numDevis: this.userForm['numDevis'].value,
      client: this.userForm['client'].value,
      commercial: this.userForm['commercial'].value,
      showroom: this.userForm['showroom'].value,  
      user: this.userForm['user'].value
    };
       this._update(user);
     
  }
  

 
  _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.produitsService.getDEVISBYID(params['id']).subscribe((user) => {
          this.form.patchValue(user); 
          this.userForm['dateDevis'].setValue(user.dateDevis);
          this.userForm['showroom'].setValue(user.showroom);
          this.userForm['status'].setValue(user.status);
          this.userForm['montant'].setValue(user.montant);
          this.userForm['numDevis'].setValue(user.numDevis);
          this.userForm['client'].setValue(user.client);
          this.userForm['commercial'].setValue(user.commercial);
          this.userForm['user'].setValue(user.user['id']);
  
          const selectedShowroom = this.showroomOptions.find(option => option.id === user.showroom);
          this.form.patchValue({
            showroom: selectedShowroom
          });
        });
      }
    });
  }
    


}
