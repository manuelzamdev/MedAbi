import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  chats = [];
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getDoctorChats('asqwedase');
    this.chatService.chatsEmitter.subscribe((res: any) => this.chats = res);

  }

}
