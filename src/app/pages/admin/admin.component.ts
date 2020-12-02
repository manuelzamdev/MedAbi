import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isCollapsed = true;
  localId = localStorage.getItem('user-id');
  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('user-id')) {
      this.router.navigate(['/login']);
    }
    if (localStorage.getItem('newChat')) {
      this.chatService.newMessage(localStorage.getItem('newChat'), this.localId, 'Hola, quiero hacer una consulta');
      localStorage.removeItem('newChat');
      this.router.navigate(['/admin/chats']);
    }
  }

}
