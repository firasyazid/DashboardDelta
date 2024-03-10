import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 import { MessageService } from 'primeng/api';
import { Article, ArticleService } from '@eshop/products';
import { timer } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'admin-collaboraters-list',   
  templateUrl: './collaboraters-list.component.html',
  styles: [
  ]
})



export class CollaboratersListComponent implements OnInit {
  articles: Article[] = [];
  selectedArticleContent = '';
  displayDialog = false;
  currentProductId!: string;
  articleSummary: string;
  isModal = false;
  displayDialog2 = false;
  imageDisplay!: string | ArrayBuffer;

 
 
  newClaim: Article = {
    description: '',
    contenu: '',
    image: '',
   };


  constructor(private articleService: ArticleService,    private messageService : MessageService,
 
    private router: Router, 
    ) { 
 }


  ngOnInit(): void {
    this._getArticle();
 
  }
   
  
  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.newClaim.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
  
  private _getArticle(){ 
    this.articleService.getArticle().subscribe( (p) => { 
      this.articles = p;
    }
          )
  }


  deleteArticle(artcileid: string) {
  
    this.articleService.deleteArticle(artcileid).subscribe( () => { 
      this._getArticle();
      this.messageService.add({severity:'success', summary:' success', detail:'article deleted'});
    });
  }

  convertToFormData(newClaim: Article): FormData {
    const formData = new FormData();
    formData.append('description', newClaim.description);
    formData.append('contenu', newClaim.contenu);
    formData.append('image', newClaim.image);
    return formData;
  }
  

  
  updateArticle(collabid: string) {
    this.router.navigateByUrl(`collab/form/${collabid}`);
  }

  summarizeArticle(id: string): void {
    this.articleService.summarizeArticle(id).subscribe(summary => {
      console.log(summary);
     });
  }
  showDialog(articleContent: string): void {
    this.selectedArticleContent = articleContent;
    this.displayDialog = true;
  }

  hideDialog(): void {
    this.selectedArticleContent = '';
    this.displayDialog = false;
  }


  Qrcode(id: string): void {
    this.articleService.QrCode(id).subscribe(qrcode => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Qr Code Dowloaded!`
      });
     });
  }
   
 
    _addArticle(collab: FormData) {
    this.articleService.createArticle(collab).subscribe(
      (collab: Article) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Article ${collab.id} is created!`
        });
        this.displayDialog2 = false; // close the dialog
        this._getArticle(); // refresh the claims list
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

}