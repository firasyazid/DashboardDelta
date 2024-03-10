import { Component, OnInit } from '@angular/core';
import { ProduitsService, Articless } from '@eshop/products';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'admin-update',
  templateUrl: './articleupdate.component.html',
  styleUrls: ['./articleupdate.component.css']
})
export class ArticleupdateComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  currentUserId!: string;
  editmode = false;
  art: Articless = new Articless();
  imageDisplay!: string | ArrayBuffer;
  imageDisplay2!: string | ArrayBuffer;
  imageDisplay3!: string | ArrayBuffer;
  imageDisplay4!: string | ArrayBuffer;
  imageDisplay5!: string | ArrayBuffer;
 


  constructor(

    private produitsService: ProduitsService,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();
  }


  private _initUserForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      contenu: ['', Validators.required],
      image: [''],
      video: [''],
      image1: [''],
      image2: [''],
      image3: [''],

    });
  }

  get ArtForm() {
    return this.form.controls;
  }


  onCancle() {
    this.location.back();
  }


  convertToFormData(newProduit: Articless): FormData {
    const formData = new FormData();
    formData.append('title', newProduit.title);
    formData.append('contenu', newProduit.contenu);
    if (newProduit.image) {
      formData.append('image', newProduit.image);
    }
    if (newProduit.video) {
      formData.append('video', newProduit.video);
    }
    if (newProduit.image1) {
      formData.append('image1', newProduit.image1);
    }
    if (newProduit.image2) {
      formData.append('image2', newProduit.image2);
    }
    if (newProduit.image3) {
      formData.append('image3', newProduit.image3);
    }
    return formData;
  }


  _update(livr: Articless) {
    const formData = this.convertToFormData(livr);
    this.produitsService.updateArtice(livr.id, formData).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Article is updated!'
        });
        this.router.navigateByUrl('/orderss');
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Article is not updated!'
        });
      }
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }


    const art: Articless = {
      id: this.currentUserId,
      title: this.ArtForm['title'].value,
      contenu: this.ArtForm['contenu'].value,
      image: this.ArtForm['image'].value,
      video: this.ArtForm['video'].value,
      image1: this.ArtForm['image1'].value,
      image2: this.ArtForm['image2'].value,
      image3: this.ArtForm['image3'].value,
    };
    this._update(art);

  }



  _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.produitsService.getArticleId(params['id']).subscribe((user) => {
          this.ArtForm['title'].setValue(user.title);
          this.ArtForm['contenu'].setValue(user.contenu);
          this.ArtForm['image'].setValue(user.image);
          this.ArtForm['video'].setValue(user.video);
          this.ArtForm['image1'].setValue(user.image1);
          this.ArtForm['image2'].setValue(user.image2);
          this.ArtForm['image3'].setValue(user.image3);

        });
      }
    });
  }

  

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay = reader.result;
        this.form.get('image').setValue(file); 
      };
      reader.readAsDataURL(file);
    }
  }
  

  onImageUpload1(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay2 = reader.result;
        this.form.get('image1').setValue(file); 
      };
      reader.readAsDataURL(file);
    }
  }
  

  onImageUpload2(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay3 = reader.result;
        this.form.get('image2').setValue(file); 
      };
      reader.readAsDataURL(file);
    }
  }
  

  onImageUpload3(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay4 = reader.result;
        this.form.get('image3').setValue(file); 
      };
      reader.readAsDataURL(file);
    }
  }

  onVideoUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay5 = reader.result;
        this.form.get('video').setValue(file); 
      };
      reader.readAsDataURL(file);
    }
  }
}
