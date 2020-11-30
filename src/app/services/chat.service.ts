import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messagesEmiter = new EventEmitter();
  id = localStorage.getItem('user-id');

  createRoom() {
    firebase.default.database().ref('idDoctor/' + 'idenfermo').push({
      senderId: this.id,
      message: 'me  di duro no te imaginas mi doctor',
      date: new Date().toDateString()
    });

  }

  getMessages(idDoctor: string, idPatient: string) {
    firebase.default.database().ref(`${idDoctor}/${idPatient}`).on('value', (snapshot: any) => {
      const data = [];
      snapshot.forEach(( e: any ) => {
        const element = e.val();
        data.push({
          message: element.message,
          date: element.date,
          senderId: element.senderId
        });
        }
      );
      this.messagesEmiter.emit(data);
    });
  }

  newMessage(idDoctor: string, idPatient: string, message: string) {
    firebase.default.database().ref(`${idDoctor}/${idPatient}`).push({
      senderId: this.id,
      message,
      date: new Date().toDateString()
    })
  }

  constructor() {
    firebase.default.initializeApp(environment.firebase);
   }
}
