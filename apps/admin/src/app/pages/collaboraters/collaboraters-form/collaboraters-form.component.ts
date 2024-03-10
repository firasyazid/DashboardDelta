import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Article, ArticleService } from '@eshop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
 
@Component({
  selector: 'admin-collaboraters-form',
  templateUrl: './collaboraters-form.component.html',
  styles: [
  ]
})
export class CollaboratersFormComponent implements OnInit {
  editmode = false;
  form!: FormGroup;
  isSubmitted  = false; 
  articles: Article[] = [];
  imageDisplay!: string | ArrayBuffer;
  currentProductId!: string;
  articleSummary: string;


  constructor(private formBuilder: FormBuilder ,private router: Router, 
      private articleserv : ArticleService,
       private messageService: MessageService,
      private location: Location,
      private route: ActivatedRoute,) { }

  ngOnInit(): void {
     this._initForm();
    this._getCategories();
    this._checkEditMode();
  }
  private _initForm() { 
  
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      contenu: ['', Validators.required],
      image: ['', Validators.required],
      });

  }
 
  onCancle() {
    this.location.back();
  }
  get ColabForm() {
    return this.form.controls;
  }


  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
       const fileReader = new FileReader();
      fileReader.onload = () => {
         this.imageDisplay != fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }

  
  private _getCategories() {
    this.articleserv.getArticle().subscribe((art) => {
      this.articles = art;
    });
  }

  
 
  
  private _addcollab(collab: FormData) {
    this.articleserv.createArticle(collab).subscribe(
      (collab: Article) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Article ${collab.id} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
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


  private _updateCollab(productFormData: FormData) {

    this.articleserv.updateArticle(productFormData,this.currentProductId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Article is updated!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
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
  


  private _checkEditMode() {
    this.route.params.subscribe((params) => {
         if (params['id'] ){
          this.editmode = true;
          this.currentProductId = params['id'];
           this.articleserv.getArticlebyid(params['id']).subscribe((collab) => {
          this.ColabForm['description'].setValue(collab.description);
          this.ColabForm['contenu'].setValue(collab.contenu);
          this.ColabForm['image'].setValidators([]);
          this.ColabForm['image'].updateValueAndValidity();
         });
      }
    });
  }
 

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
  
    const productFormData = new FormData();
    Object.keys(this.ColabForm).map((key) => {
      productFormData.append(key, this.ColabForm[key].value);
    });
  
    if (this.editmode) {
      this._updateCollab(productFormData);
    } else {
      this._addcollab(productFormData);
    }
  
  
  }

   summarizeArticle(currentProductId: string): void {
    this.articleserv.summarizeArticle(this.currentProductId)
   }


}
