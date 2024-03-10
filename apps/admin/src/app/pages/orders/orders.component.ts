import { Component, OnInit } from '@angular/core';
import { Produits,ProduitsService,Articless } from '@eshop/products';
 import { Router } from '@angular/router';
 import {ConfirmationService, MessageService } from 'primeng/api';
 import { timer } from 'rxjs';
import { Location } from '@angular/common';
 @Component({
  selector: 'admin-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent implements OnInit {
  produits: Articless[] = [];
 
selectedArticleContent = '';
 displayDialog = false;
 displayDialog2 = false;
 currentProductId!: string;
 isModal = false;
 isModal2 = false;
 imageDisplay!: string | ArrayBuffer;
 imageDisplay2!: string | ArrayBuffer;


  imageDisplay3!: string | ArrayBuffer;
  imageDisplay4!: string | ArrayBuffer;
  imageDisplay5!: string | ArrayBuffer;

 newProduit: Articless = {
  title: '',
   contenu: '',
  image: '',
  video: '',
  image1  : '', 
  image2 : '',
  image3 : '',
  };


  constructor(

    private produitsService: ProduitsService,
    private messageService : MessageService,
   private router: Router,
    private location: Location,
    private confirmationService: ConfirmationService

 
  ) { }
  ngOnInit(): void {
    this._getProduits();
    }



    private _getProduits() {
      this.produitsService.getArt().subscribe((prod) => {
        this.produits = prod;
      });
    }


   deleteProd(userId: string) {
    
    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir supprimer cet article?',
        header: 'Confirmation',
          accept: () => {
          this.produitsService.deleteArt(userId).subscribe( () => { 
            this._getProduits();
            this.messageService.add({severity:'success', summary:' success', detail:'Article suppimé'});
          }); 
         }
        
    });
      
   
}


onImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    this.newProduit.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
onImageUpload1(event) {
  const file = event.target.files[0];
  if (file) {
    this.newProduit.image1 = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay3 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}



onImageUpload2(event) {
  const file = event.target.files[0];
  if (file) {
    this.newProduit.image2 = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay4 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

onImageUpload3(event) {
  const file = event.target.files[0];
  if (file) {
    this.newProduit.image3 = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay5 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}


onVideoUpload(event) {
  const file = event.target.files[0];
  if (file) {
    this.newProduit.video = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    }
    reader.readAsDataURL(file);
   }
}

convertToFormData(newProduit: Articless): FormData {
  const formData = new FormData();
  formData.append('title', newProduit.title);
   formData.append('contenu', newProduit.contenu);
  formData.append('image', newProduit.image);
  formData.append('image1', newProduit.image1);
  formData.append('image2', newProduit.image2);
  formData.append('image3', newProduit.image3);
  
  if (newProduit.video) {
    formData.append('video', newProduit.video);
  }   return formData;
}


_addCategory(category: FormData) {
  this.produitsService.createAr(category).subscribe(
    (category: Articless) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Article  is created!`
      });
      this._getProduits();
     },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Article is not created!'
      });
    }
  );
}


showDialog(articleContent: string): void {
  this.selectedArticleContent = articleContent;
  this.displayDialog = true;
}

hideDialog(): void {
  this.selectedArticleContent = '';
  this.displayDialog = false;
}


updateArt(userid: string) {
  this.router.navigateByUrl(`orderss/form/${userid}`);
}
}