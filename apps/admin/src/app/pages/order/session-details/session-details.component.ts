import { Component, OnInit } from '@angular/core';
import { Session, UsersService } from '@eshop/products';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-detail',
  templateUrl: './session-details.component.html',
  styles: [
  ]
})
export class SessionDetailsComponent implements OnInit {
  sessions: Session;
 
  constructor(  
    private sessionService: UsersService, private messageService: MessageService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

this._getSession();
  }


 private _getSession() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.sessionService.getSessionById(params['id']).subscribe((sessions) => {
          this.sessions = sessions;
        });
      }
    });
  }
}
