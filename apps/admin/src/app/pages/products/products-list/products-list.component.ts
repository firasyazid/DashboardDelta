import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService} from '@eshop/products';
import { MessageService,ConfirmationService,  } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
   products: Product[] = [];
 

  constructor(

    private productsService: ProductsService,
    private router: Router,
    private messageService : MessageService,
    private confirmationService: ConfirmationService
    


  ){}

  ngOnInit(): void {

    this._getproducts();
  }


  private _getproducts(){ 

    this.productsService.getContacts().subscribe( (p) => { 
      this.products = p;
    }
      
      
      )
  }
   
  
  deleteContacts(userId: string) {
    
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet commande?',
      header: 'Confirmation',
        accept: () => {

    this.productsService.deleteContact(userId).subscribe( () => { 
      this._getproducts();
      this.messageService.add({severity:'success', summary:' success', detail:'Contact deleted'});
    });
  }
});}

}
