import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'eshop-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
categories : Category[]=[] ;
products: Product[]=[] ; 
isCategoryPage: boolean | undefined;


   constructor(private prodService:ProductsService, private catService: CategoriesService , private route: ActivatedRoute   ) { }

  ngOnInit(): void {
 
    

  }
   private _getCategories() {
    this.catService.getCategories().subscribe((resCats) => {
      this.categories = resCats;
    });
  }

  
 }

 