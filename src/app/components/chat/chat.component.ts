import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages = [];
  newMessage = '';
  localId = localStorage.getItem('user-id');
  
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessages('asqwedase', this.localId);
    this.chatService.messagesEmiter.subscribe(res => {
      this.messages = res;
    });
  }

  sendNewMessage() {
    this.chatService.newMessage('asqwedase', this.localId, this.newMessage);
    this.newMessage = '';
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.sendNewMessage();
    }
  }
}
