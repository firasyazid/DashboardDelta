import { Component, OnInit } from '@angular/core';
import { Devis,ProduitsService ,Status, Commande,UsersService,Commercial} from '@eshop/products';
import { Router } from '@angular/router';
import {ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'admin-commande',
  templateUrl: './commandes.component.html',
  styles: [
  ]
})
export class CommandesComponent implements OnInit {

    Commandes: Commande[] = []; 
    Commercial: Commercial;
    fullName = '';


  constructor(
    private UsersService: UsersService,
    private router: Router,
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute



  ) {    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {
    this.getCommandes();
   }
  
 //////// a voirrr
  getCommercialName(commercialId: string): void {
    this.UsersService.getCommercialNameById(commercialId).subscribe(
      (fullName: string) => {
        this.fullName = fullName;
        console.log('Commercial Name', fullName);
      },
      (error) => {
        console.error('Failed to get commercial name', error);
      }
    );
  }
  
  
    
   
   

  getCommandes() {  
    this.UsersService.getCmd().subscribe((Commandes) => {
      this.Commandes = Commandes;
      console.log('Commandes', Commandes);
    });

  }
  deleteCmd(userId: string) {
    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir supprimer cet commande?',
        header: 'Confirmation',
          accept: () => {
          this.UsersService.deleteCmd(userId).subscribe( () => { 
            this.getCommandes();
            this.messageService.add({severity:'success', summary:' success', detail:'Commande Supprimé'});
          }); 
         }
        
    });
  }


  updateCmd(userid: string) {
    this.router.navigateByUrl(`commandes/form/${userid}`);
  }


  exportExcel(Commandes): void {
    const json = Commandes.map(commande => ({
        'Numéro Commande': commande.numCmd,
        'Montant Commande': commande.montantCmd,
        'Date Commande': commande.dateCmd,
        'Numéro Devis': commande.devis.numDevis,
        'Montant Devis': commande.devis.montant,
        'Date Devis': commande.devis.dateDevis,
        'Nom': commande.user.name,
        'Showroom': commande.showroom.title
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'commandes.xlsx');
}



exportPdf(Commandes): void {
  const documentDefinition = {
    pageSize: { width: 1200, height: 1000 },
    content: [
      {
        text: 'Liste des commandes',
        style: 'header'
      },
      {
        table: {
          widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: [
            ['Numéro Commande', 'Montant Commande', 'Date Commande', 'Numéro Devis', 'Montant Devis', 'Date Devis', 'Nom', 'Showroom'],
            ...this.Commandes.map(commande => ([commande.numCmd, commande.montantCmd, commande.dateCmd, commande.devis.numDevis, commande.devis.montant,  commande.devis.dateDevis, commande.user?.name, commande.showroom.title]))
          ]
        }
      }
    ],
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 10]
      }
    }
  };

  pdfMake.createPdf(documentDefinition).open();
}
 



 


}
