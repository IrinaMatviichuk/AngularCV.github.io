import { EventEmitter, Injectable } from '@angular/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { MessageChat } from './chat.model';

const CHAT_URL = 'http://localhost:8085/gs-guide-websocket';

@Injectable()
export class ChatService {
  private stompClient: Stomp;
  message = new EventEmitter<MessageChat>();
  constructor() {
    this.connect(CHAT_URL);
  }
  connect(url: string): void {
    const ws = new SockJS(url);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, (frame) => {
      that.stompClient.subscribe('/topic/greetings', (message) => {
        if (message.body) {
          this.message.emit(JSON.parse(message.body));
        }
      });
    });
  }
  sendMessage(message: MessageChat): void {
    this.stompClient.send('/app/hello', {}, JSON.stringify(message));
  }
}
