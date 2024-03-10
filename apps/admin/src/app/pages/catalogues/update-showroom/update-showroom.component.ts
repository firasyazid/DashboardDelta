import { Component, OnInit } from '@angular/core';
import { Devis ,Status, Commercial,UsersService,Showroom} from '@eshop/products';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'admin-show',
  templateUrl: './update-showroom.component.html',
  styleUrls: ['./update-showroom.component.css']
})
export class UpdateShowroomComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  currentUserId!: string;
  editmode = false;
  showroom: Showroom = new Showroom(); 
  statusValues = Object.values(Status);
  commercialOptions: Commercial[] = [];
  selectedCommercial: Commercial;

  commercialOptions2: Commercial[] = [];
  selectedCommercial2: Commercial;

  constructor(  
    private userService: UsersService,
    private messageService : MessageService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
   ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();
    this.loadCommercialOptions();
    this.loadCommercialOptions2();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
    title: ['', Validators.required],
    commercial: ['', Validators.required],
    commercial2 : ['', Validators.required]
    });
  }


  get userForm() {
    return this.form.controls;
  }
  onCancle() {
    this.location.back();
  }

  
  loadCommercialOptions2() {
    this.userService.getCommercial().subscribe(
      (options: Commercial[]) => {
        this.commercialOptions2 = options;
        console.log('commercial options2', options);
      },
      (error) => {
        console.error('Failed to load commercial2 options', error);
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

    
  _update(devis: Devis) {
    this.userService.updateShow(devis).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'shworoom is updated!'
        });

        this.router.navigateByUrl('/catalogues');
        
              },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'shworoom is not updated!'
        });
      }
    );
  }
 

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: Showroom = {
      id: this.currentUserId,
       commercial: this.userForm['commercial'].value,
       title: this.userForm['title'].value,
        commercial2: this.userForm['commercial2'].value

      };
       this._update(user);
     
  }



  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.userService.getShowid(params['id']).subscribe((showroom) => {
          this.showroom = showroom;
          this.userForm['title'].setValue(showroom.title);
          this.userForm['commercial'].setValue(showroom.commercial);
        });
      }
    });
  }
 
}
