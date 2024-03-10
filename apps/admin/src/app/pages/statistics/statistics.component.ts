import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Devis,ProduitsService ,Status, Commercial,Showroom,UsersService} from '@eshop/products';
import { Router } from '@angular/router';
import {ConfirmationService, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
 import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
 



@Component({
  selector: 'admin-stat',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  
  devis: Devis[] = [];
  selectedArticleContent = '';
  displayDialog = false;
  currentProductId!: string;
  isModal = false; 

  commercialOptions: Commercial[] = [];
  selectedCommercial: Commercial;
  errorMessage = '';


showroomOptions: Showroom[] = [];
selectedShowroom: Showroom;
 
  newProduit: Devis = {
    dateDevis: new Date(),
    status: Status.Devis,
    montant: 0,
    user: '',
    showroom: '',
    numDevis: '',
    client: '',
    commercial: '',
     };


   constructor( 
    private produitsService: ProduitsService,
    private router: Router,
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private userService: UsersService,
    
  ) {


    pdfMake.vfs = pdfFonts.pdfMake.vfs;

   }


  ngOnInit(): void {
    this._getProduits();
    this.loadCommercialOptions();
    this.ShowroomOptions();
    }

    ShowroomOptions() {
      this.userService.getShowroom().subscribe(
        (options: Showroom[]) => {
          this.showroomOptions = options;
          console.log('showroom options', options);
        },
        (error) => {
          console.error('Failed to load showroom options', error);
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
     _getProduits() {
      this.produitsService.getDevis().subscribe((prod) => {
        this.devis = prod;
      });
    }
  

    
    deleteDevis(userId: string) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this Devis?',
        header: 'Delete Devis',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.produitsService.deleteDevis(userId).subscribe( () => { 
            this._getProduits();
            this.messageService.add({severity:'success', summary:' success', detail:'Devis deleted'});
          });
            }
      });
    }
  
    
    
    
  
    _addCategory(category: any) {
      if (!this.isFormValid()) {
         return;
      }
    
      this.produitsService.createDevis(category).subscribe(
        (category: Devis) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Devis is created!`
          });
          this._getProduits();
          console.log('category', category);
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Devis is not created!'
          });
        }
      );
    }
    
    isFormValid(): boolean {
      if (!this.newProduit.dateDevis ||
          !this.newProduit.status ||
          !this.newProduit.montant ||
          !this.newProduit.user ||
          !this.newProduit.showroom ||
          !this.newProduit.client ||
          !this.newProduit.commercial) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Veuillez remplir tous les champs.'
        });
        return false;
      }

      if (!this.newProduit.numDevis || this.newProduit.numDevis.length < 6) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Le champ Numéro Devis doit contenir au moins 6 caractères.'
        });
        return false;
      }
    
      return true;
    }
    
    

    showDialog(articleContent: string): void {
      this.selectedArticleContent = articleContent;
      this.displayDialog = true;
    }
  
    hideDialog(): void {
      this.selectedArticleContent = '';
      this.displayDialog = false;
    }


    
   _updateDevis(devisId: string) {
    this.produitsService.ConvertDevis(devisId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Devis is converted!'
        });
        this._getProduits();
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Devis is not converted!'
        });
      }
    );
  }

  updatee(userid: string) {
    this.router.navigateByUrl(`devis/form/${userid}`);
  }




  exportExcel(devis): void {
    const json = devis.map(devis => ({
        'ID': devis.id,
        'Date devis': devis.dateDevis,
        'Status': devis.status,
        'Utilisateur': devis.user ? devis.user.name : '',  
        'Montant Devis': devis.montant,
        'Showroom': devis.showroom ? devis.showroom.title : '',  
        'Client': devis.client,
        'Commercial': devis.commercial ? devis.commercial.fullName : '', 
        'Numéro Devis': devis.numDevis,
        'Converti': devis.converted
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'devis.xlsx');
}


 exportPdf(devis): void {
    const documentDefinition = {
      pageSize: { width: 1200, height: 1000 },

      content: [

        { text: 'Devis Data', style: 'header' },
        {
          table: {
            headerRows: 1,
             body: [
              ['ID', 'Date devis', 'Status', 'Utilisateur', 'Montant Devis', 'Showroom', 'Client', 'Commercial', 'Numéro Devis', 'Converti'],
              ...devis.map(d => [d.id, d.dateDevis, d.status, d.user ? d.user.name : '', d.montant, d.showroom ? d.showroom.title : '', d.client, d.commercial ? d.commercial.fullName : '', d.numDevis, d.converted])
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).open();
  }


}
