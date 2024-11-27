import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Produits, ProduitsService } from '@eshop/products';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent  implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
  currentUserId!: string;
  editmode = false;
  prd: Produits = new Produits();
  imageDisplay!: string | ArrayBuffer;
  imageDisplay2!: string | ArrayBuffer;
  imageDisplay3!: string | ArrayBuffer;
  imageDisplay4!: string | ArrayBuffer;
  imageDisplay5!: string | ArrayBuffer;


  articleId: string;
  article: Produits;
  images: string[] = [];
  video: string;

  constructor(private messageService: MessageService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private produitsService: ProduitsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();
    this.route.params.subscribe(params => {
      this.articleId = params['id'];
      this.loadArticle(this.articleId);
    });

  }


  loadArticle(articleId: string): void {
    this.produitsService.getProduitId(articleId).subscribe(article => {
      this.article = article;
      this.images.push(article.image);
      this.images.push(article.image1);
      this.images.push(article.image2);
      this.images.push(article.image3);
      this.video = article.video;
      this.imageDisplay = article.image;
      this.imageDisplay2 = article.image1;
      this.imageDisplay3 = article.image2;
      this.imageDisplay4 = article.image3;
      this.imageDisplay5 = article.video;
    });
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


  get PrdForm() {
    return this.form.controls;
  }


  onCancle() {
    this.location.back();
  }


  convertToFormData(newProduit: Produits): FormData {
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



   

  _update(livr: Produits) {
    const formData = this.convertToFormData(livr);
    this.produitsService.updateProduit(livr.id, formData).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Produits is updated!'
        });
        this.router.navigateByUrl('/categories');
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Produits is not updated!'
        });
      }
    );
  }
 

    ///imagedelete 

    deleteImage() {
      if (confirm('Are you sure you want to delete this image?')) {
         this.produitsService.deleteImageP(this.articleId).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Image deleted successfully'
            });
            this.loadArticle(this.articleId);
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete image'
            });
          }
        );
      }
    }
    
      
      
    deleteImage1() {
      if (confirm('Are you sure you want to delete this image?')) {
         this.produitsService.deleteImage2P(this.articleId).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Image deleted successfully'
            });
            this.loadArticle(this.articleId);
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete image'
            });
          }
        );
      }
    }
  
  
    deleteImage2() {
      if (confirm('Are you sure you want to delete this image?')) {
         this.produitsService.deleteImage3P(this.articleId).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Image deleted successfully'
            });
            this.loadArticle(this.articleId);
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete image'
            });
          }
        );
      }
    }
    
    
    deleteImage3() {
      if (confirm('Are you sure you want to delete this image?')) {
         this.produitsService.deleteImage4P(this.articleId).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Image deleted successfully'
            });
            this.loadArticle(this.articleId);
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete image'
            });
          }
        );
      }
    }
    
  
  











    deleteVideo() {
      if(confirm('Are you sure you want to delete this video?')) {
        this.produitsService.deleteVideoProd(this.articleId).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Video deleted successfully'
            });
            this.loadArticle(this.articleId);
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete video'
            });
          }
        );
      }
    }













onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }


    const art: Produits = {
      id: this.currentUserId,
      title: this.PrdForm['title'].value,
      contenu: this.PrdForm['contenu'].value,
      image: this.PrdForm['image'].value,
      video: this.PrdForm['video'].value,
      image1: this.PrdForm['image1'].value,
      image2: this.PrdForm['image2'].value,
      image3: this.PrdForm['image3'].value,
    };
    this._update(art);

  }


  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.produitsService.getProduitId(params['id']).subscribe((produit) => {
          this.PrdForm['title'].setValue(produit.title);
          this.PrdForm['contenu'].setValue(produit.contenu);
          this.PrdForm['image'].setValue(produit.image);
          this.PrdForm['video'].setValue(produit.video);
          this.PrdForm['image1'].setValue(produit.image1);
          this.PrdForm['image2'].setValue(produit.image2);
          this.PrdForm['image3'].setValue(produit.image3);

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

