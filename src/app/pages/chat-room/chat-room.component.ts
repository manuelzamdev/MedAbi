import { Component, EventEmitter, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/userInfo.service';
import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  typeEmitter = new EventEmitter();
  chats = [];
  setChat = '';
  localId = localStorage.getItem('user-id');
  localIdType;
  constructor(private chatService: ChatService, private userInfoS: UserInfoService) { }

  ngOnInit() {
    this.userInfoS.getUserType(this.localId);
    this.userInfoS.userTypeEmitter.subscribe((type: any) => {
      this.localIdType = type;
      this.typeEmitter.emit(true);

    });
    this.typeEmitter.subscribe(() => {
      if (this.localIdType === 0) {
        this.chatService.getDoctorChats(this.localId);
      } else {
        this.chatService.getPatientChats(this.localId);
      }
      this.chatService.chatsEmitter.subscribe((chats: any) => this.chats = chats);
    });

  }

  showChat(id: string) {
    this.setChat = id;
  }

}
