import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 import { User, UsersService,Commercial } from '@eshop/products';
import { MessageService,ConfirmationService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'admin-commercial',
  templateUrl: './commercials.component.html',
  styleUrls: ['./commercials.component.css']
})
export class CommercialsComponent implements OnInit {

  Commercial: Commercial[] = [];

selectedArticleContent = '';
  displayDialog = false;
  currentProductId!: string;
  isModal = false; 


 
  newProduit: Commercial = {
     fullName: '',
    Phone: '',
       };

  constructor(

    private usersService: UsersService,
    private router: Router,
    private messageService : MessageService,
    private confirmationService: ConfirmationService,

  ) { }

  ngOnInit(): void {
    this._getCommercials();
  }



  private _getCommercials() {
    this.usersService.getCommercial().subscribe((commercials) => {
      this.Commercial = commercials;
    });
  }
 
  deleteCommercial(commercialId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this commercial?',
      header: 'Delete Commercial',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

    this.usersService.deleteCom(commercialId).subscribe(() => {
      this._getCommercials();
      this.messageService.add({severity:'success', summary:'Success', detail:'Commercial Deleted'});
    },
    () => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Commercial not Deleted'});
    });
  }
    
  });
  }
  _addCommercial(category: any) {
    this.usersService.createCommercial(category).subscribe(
      (category: Commercial) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Commercial  is created!`
        });
       this._getCommercials();
       },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Commercial is not created!'
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

    updateCommercial(commercialId: string) {
      this.router.navigateByUrl(`commercials/form/${commercialId}`);
    }


}
