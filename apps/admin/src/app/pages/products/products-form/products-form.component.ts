 import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService , Category, Product, ProductsService} from '@eshop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';



@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {

  editmode = false;
  form!: FormGroup;
  isSubmitted  = false; 
  catagories: Category[] = [];
  imageDisplay!: string | ArrayBuffer;
  currentProductId!: string;

   

  constructor(   private formBuilder: FormBuilder ,private router: Router, 
    ) { 
    
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  

}
 