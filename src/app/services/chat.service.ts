import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserInfoService } from './userInfo.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatsEmitter = new EventEmitter();
  messagesEmiter = new EventEmitter();
  id = localStorage.getItem('user-id');

  constructor(private userInfoS: UserInfoService) {
    /* firebase.default.initializeApp(environment.firebase); */
  }

  /* createRoom() {
    firebase.default.database().ref('idDoctor/' + 'idenfermo').push({
      senderId: this.id,
      message: 'me  di duro no te imaginas mi doctor',
      date: new Date().toDateString()
    });

  } */

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

  getDoctorChats(id: string) {
    const data = [];
    firebase.default.database().ref(`${id}`).on('value', (snapshot: any) => {
      snapshot.forEach(( e: any ) => {
        this.userInfoS.getUserInfo(e.ref_.path.pieces_[1]);
        this.userInfoS.userDataEmitter.subscribe((res: any) => {
          if (data[0]) {
            if (data[data.length - 1].uid !== res.uid) {
              data.push({...res});
            }
          } else {
            data.push({...res});
          }
        });
      });
      this.chatsEmitter.emit(data);
    });
  }

  getPatientChats(id: string) {
    const data = [];
    firebase.default.database().ref('/').on('value', (snapshot: any) => {
      snapshot.forEach(( e: any ) => {
        const patientChat = e.val();
        if (patientChat.hasOwnProperty(id)) {
          this.userInfoS.getUserInfo(e.ref_.path.pieces_[0]);
          this.userInfoS.userDataEmitter.subscribe((res: any) => {
            if (data[0]) {
              if (data[data.length - 1].uid !== res.uid) {
                data.push({...res});
              }
            } else {
              data.push({...res});
            }
          });
        }
      });
      this.chatsEmitter.emit(data);
    });
  }

  newMessage(idDoctor: string, idPatient: string, message: string) {
    if (message.trim() !== '') {
      firebase.default.database().ref(`${idDoctor}/${idPatient}`).push({
        senderId: this.id,
        message,
        date: new Date().toDateString()
      });
    }
  }

}
