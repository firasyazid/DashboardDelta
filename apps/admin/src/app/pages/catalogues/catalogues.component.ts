import { Component, OnInit } from '@angular/core';
import { UsersService,Showroom,Commercial} from '@eshop/products';
import { Router } from '@angular/router';
 import { MessageService,ConfirmationService } from 'primeng/api';
 import { Location } from '@angular/common';
 

@Component({
  selector: 'admin-showrrom',
  templateUrl: './catalogues.component.html',
  styles: [
  ]
})
export class CataloguesComponent implements OnInit {


  showrooms: Showroom[] = [];

  selectedArticleContent = '';
  displayDialog = false;
  currentProductId!: string;
  isModal = false;


   newProduit: Showroom = {
    title: '',
    commercial:  '',
    commercial2: ""
};

commercialOptions: Commercial[] = [];
selectedCommercial: Commercial;

commercialOptions2: Commercial[] = [];
selectedCommercial2: Commercial;

  constructor(
    private userService: UsersService,
    private messageService : MessageService,
   private router: Router,
    private location: Location,
    private confirmationService: ConfirmationService

  ) { }

  ngOnInit(): void {
    this._getCatalogues();
    this.loadCommercialOptions();
    this.loadCommercialOptions2();
  }

  loadCommercialOptions2() {
    this.userService.getCommercial().subscribe(
      (options: Commercial[]) => {
        this.commercialOptions2 = options;
        console.log('commercial options', options);
      },
      (error) => {
        console.error('Failed to load commercial options', error);
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


  private _getCatalogues() {
    this.userService.getShowroom().subscribe((prod) => {
      this.showrooms = prod;
    });
  }

  deleteProd(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this showroom?',
      header: 'Delete showroom',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteShowroom(userId).subscribe( () => { 
          this._getCatalogues();
          this.messageService.add({severity:'success', summary:' success', detail:'Showroom deleted'});
        });
      }
    });
   
  }
 

  isShowroomValid(showroom: Showroom): boolean {
    return !!showroom.title && !!showroom.commercial;
  }
  

  _addCategory(category: Showroom) {
    if (!this.isShowroomValid(category)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Veuillez remplir tous les champs.'
      });
      return;
    }
  
    this.userService.createShowroom(category).subscribe(
      (category: Showroom) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Showroom is created!`
        });
        this._getCatalogues();
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Showroom is not created!'
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

  updateUser(userid: string) {
    this.router.navigateByUrl(`catalogues/form/${userid}`);
  }

}
