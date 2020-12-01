import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { UserInfoService } from 'src/app/services/userInfo.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() chatId = '';
  @Input() localIdType = null;
  messages = [];
  newMessage = '';
  active = false;
  localId = localStorage.getItem('user-id');

  constructor(private chatService: ChatService, private userInfoS: UserInfoService) {}

  ngOnInit(): void {
    if (this.localIdType === 0) {
      this.chatService.getMessages(this.localId, this.chatId);
    } else {
      this.chatService.getMessages(this.chatId, this.localId);
    }
    this.chatService.messagesEmiter.subscribe((res: any) => {
      this.messages = res;
      console.log(res)
    });
  }

  sendNewMessage() {
    if (this.localIdType === 0) {
      this.chatService.newMessage(this.localId, this.chatId, this.newMessage);
    } else {
      this.chatService.newMessage(this.chatId, this.localId, this.newMessage);
    }
    this.newMessage = '';
  }

  handleKeyPress(event: any) {
    if (event.key === 'Enter') {
      this.sendNewMessage();
    }
  }
}
