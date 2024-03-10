import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 import { MessageService,ConfirmationService } from 'primeng/api';
 import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { Produits,ProduitsService } from '@eshop/products';

 

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {
 
  produits: Produits[] = [];
 
  selectedArticleContent = '';
  displayDialog = false;
  currentProductId!: string;
  isModal = false;
  imageDisplay!: string | ArrayBuffer;
  imageDisplay2!: string | ArrayBuffer;

  imageDisplay3!: string | ArrayBuffer;
  imageDisplay4!: string | ArrayBuffer;
  imageDisplay5!: string | ArrayBuffer;


  newProduit: Produits = {
    title: '',
    description: '',
    contenu: '',
    image: '',
    video: '',
    image1: '',
    image2: '',
    image3: '',
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
      this.produitsService.getContacts().subscribe((prod) => {
        this.produits = prod;
      });
    }
  

    deleteProd(userId: string) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this produit?',
        header: 'Delete Produit',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.produitsService.deleteprod(userId).subscribe( () => { 
            this._getProduits();
            this.messageService.add({severity:'success', summary:' success', detail:'produit deleted'});
          });        },
         }
      );    
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
    
    onImageUpload2(event) {
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

    onImageUpload3(event) {
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


    
    onImageUpload4(event) {
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
    
      
    convertToFormData(newProduit: Produits): FormData {
      const formData = new FormData();
      formData.append('title', newProduit.title);
      formData.append('description', newProduit.description);
      formData.append('contenu', newProduit.contenu);
      formData.append('image', newProduit.image);
      formData.append('video', newProduit.video);
      formData.append('image1', newProduit.image1);
      formData.append('image2', newProduit.image2);
      formData.append('image3', newProduit.image3);
       return formData;
    }
    
    
       
       _addCategory(category: FormData) {
        this.produitsService.createProduit(category).subscribe(
          (category: Produits) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Produit  is created!`
            });
           this._getProduits();
           },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Produit is not created!'
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
    
     
    

          updateProd(userid: string) {
            this.router.navigateByUrl(`categories/form/${userid}`);
          }







}

    


 


 