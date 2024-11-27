import { Component, OnInit } from '@angular/core';
import { UsersService,Notification} from '@eshop/products';
 import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [MessageService]
})
export class NotificationsComponent implements OnInit {
  title = '';
  message = '';

  constructor(private usersService: UsersService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  sendNotification(): void {
    const notification: Notification = { title: this.title, message: this.message };

    this.usersService.createNotification(notification).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Notification Sent', detail: 'The notification was sent successfully.' });
        this.title = '';
        this.message = '';
      },
      error => {
        console.error('Error sending notification:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to send notification.' });
      }
    );
  }
}
