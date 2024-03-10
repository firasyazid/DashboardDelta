import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat';   
import { Client, Message } from '@stomp/stompjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: Client;
  private serverUrl = 'ws://localhost:3308/ws/websocket';
  private channel = '/topic/public';

  constructor(private http: HttpClient) {
    this.stompClient = new Client({
      brokerURL: this.serverUrl,
       debug: (str: string) => console.log(str)
    });
  }

  connect(): Observable<Chat[]> {
    return new Observable(observer => {
      this.stompClient.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        this.stompClient.subscribe(this.channel, (message: Message) => {
          observer.next(JSON.parse(message.body) as Chat[]);
        });
      };
      this.stompClient.activate();
    });
  }

  register(username: string): void {
    this.stompClient.publish({
      destination: '/app/chat.register',
      body: JSON.stringify({
        sender: username,
        type: 'JOIN'
      })
    });
  }

  sendMessage(chatMessage: Chat): void {
    this.stompClient.publish({
      destination: '/app/chat.send',
      body: JSON.stringify({
        sender: chatMessage.sender,
        content: chatMessage.content,
        type: 'CHAT'
      })
    });
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
