import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chat, ChatService } from '@eshop/products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  usernameForm: FormGroup;
  messageForm: FormGroup;
  messages: Chat[] = [];
  connected = false;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService) { }

  ngOnInit(): void {
    this.usernameForm = this.formBuilder.group({
      username: ['', Validators.required]
    });

    this.messageForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const username = this.usernameForm.controls['username'].value;
    this.chatService.connect().subscribe(() => {
      this.chatService.register(username);
      this.connected = true;
    });
  }

  sendMessage(): void {
    const sender = this.usernameForm.controls['username'].value;
    const content = this.messageForm.controls['content'].value;
    const chatMessage: Chat = { sender, content };
    this.chatService.sendMessage( chatMessage);
    this.messageForm.reset();
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

}
