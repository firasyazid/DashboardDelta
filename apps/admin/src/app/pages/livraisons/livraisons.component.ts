import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
  import { UsersService,Livraison} from '@eshop/products';
import {ConfirmationService, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

 
@Component({
  selector: 'admin-livraisons',
  templateUrl: './livraisons.component.html',
  styles: [
  ]
})
export class LivraisonsComponent implements OnInit {
Livr: Livraison[] = []; 



  constructor( 
    private usersService: UsersService,
    private router: Router,
    private messageService : MessageService,
    private confirmationService: ConfirmationService
 

  ) {    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {

this._getLivr();

  }


private _getLivr() {
  this.usersService.getLivraisons().subscribe((Livr) => {
    this.Livr = Livr;
  });

}

updateLivr(userid: string) {
  this.router.navigateByUrl(`livraisons/form/${userid}`);
}

deleteLiv(userId: string) {
  this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet livraison?',
      header: 'Confirmation',
        accept: () => {
        this.usersService.deleteLivr(userId).subscribe( () => { 
          this._getLivr();
          this.messageService.add({severity:'success', summary:' success', detail:'Livraison suppimé'});
        }); 
       }
      
  });
}
exportExcel(Livraison): void {
  const json = Livraison.map(commande => ({
      'Nom Client': commande.user.name,
      'Numéro Livraison': commande?.numLivraison,
      'Montant Livraison': commande?.montantLivraison,
      'Date Livraison': commande?.dateLivraison,
      'Numéro devis': commande.devis.numDevis,
      'Numéro commande': commande.commande?.numCmd,
   }));

  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'livraison.xlsx');
}
 
exportPdf(Livr): void {
  const documentDefinition = {
    pageSize: { width: 1200, height: 1000 },
    content: [
      {
        text: 'Liste des livraisons',
        style: 'header'
      },
      {
        table: {
          widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: [
            ['Numéro Livraison', 'Montant Livraison', 'Date Livraison', 'Numéro Devis', 'Montant Devis', 'Nom'],
            ...this.Livr.map(livraison => ([
              livraison.numLivraison || '',  // Use default value if numLivraison is NaN
              livraison.montantLivraison || '',  // Use default value if montantLivraison is NaN
              livraison.dateLivraison || '',  // Use default value if dateLivraison is NaN
              livraison.devis?.numDevis || '',  // Use default value if numDevis is NaN
              livraison.devis?.montant || '',  // Use default value if montant is NaN
              livraison.user?.name || ''  // Use default value if name is NaN
            ]))
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
