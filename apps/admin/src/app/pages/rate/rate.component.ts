import { Component, OnInit } from '@angular/core';
import { UsersService,Rate } from '@eshop/products';
import { Router } from '@angular/router';
 import { MessageService } from 'primeng/api';
 import { Location } from '@angular/common';
 import { timer } from 'rxjs';

@Component({
  selector: 'admin-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  rate: Rate[] = [];
  displayDialogUpdate = false;
  isModal = false;
  lastSession: any;
  selectedSession: Rate = {};
  
  newSession: Rate = {
     conversionRate: 0,
   };

  constructor(  
    private userService: UsersService,
    private messageService : MessageService,
  ) { }

  ngOnInit(): void {
    this._getRates();
  }



  private _getRates() {
    this.userService.getRate().subscribe((rate) => {
      this.rate = rate;
    });
  }

  deleteRate(Id: string) {
    this.userService.deleteRate(Id).subscribe( () => { 
      this._getRates();
      this.messageService.add({severity:'success', summary:' success', detail:'Rate deleted'});
    });
  }

  _addCategory(rate: Rate) {
    this.userService.createShowroom(rate).subscribe(
      (rate: Rate) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Rate  is created!`
        });
       this._getRates();
       },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Rate is not created!'
        });
      }
    );
  }


  _updateSession(claim: Rate) {
    this.userService.updateRate(claim).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'rate is updated!',
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.displayDialogUpdate = false;
            this._getRates();  
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'rate is not updated!',
        });
      }
    );
  }

  openUpdateDialog(rate: Rate) {
    this.selectedSession = { ...rate };   
    this.displayDialogUpdate = true;
  }


}
