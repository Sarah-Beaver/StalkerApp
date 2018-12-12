import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { Chat } from "../../app/app.models";
import { FIREBASE_CONFIG } from "../../app/credentials";
import { ChatService } from "../../app/app.service";
import { Storage } from "@ionic/Storage";
@IonicPage()
@Component({
  selector: "page-chatroom",
  templateUrl: "personalchat.html"
})
export class PersonalchatPage implements OnInit {
  chats: any = [];
  chatpartner; 
  chatuser;
  message: string;
  chatPayload: Chat;
  intervalScroll;
  @ViewChild("content") content: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore,
    private chatService: ChatService,
    //private storage: Storage
  ) {
    this.chatpartner = this.chatService.currentChatPartner;
    this .chatuser = this.chatService.currentUser;
    console.log ("Username: "+this.chatpartner.first);
  }


  //scrolls to bottom whenever the page has loaded
  ionViewDidEnter() {
    this.content.scrollToBottom(300); //300ms animation speed
  }

  ngOnInit() {

  

   this.db
      .collection<Chat>(FIREBASE_CONFIG.chats_endpoint, res => {
        return res.where("pair", "==", this.chatService.currentChatPairId);
      })
      .valueChanges()
      .subscribe(chats => {
        
        this.chats = chats;
       
      });
  } //ngOnInit

  addChat() {
    if (this.message && this.message !== "") {
      console.log(this.chatuser);
      
      this.chatPayload = {
        message: this.message,
        sender: this.chatuser.email,
        pair: this.chatService.currentChatPairId,
        time: new Date().getTime()
      };

      this.chatService
        .addChat(this.chatPayload)
        .then(() => {
          //Clear message box
          this.message = "";

          //Scroll to bottom
          this.content.scrollToBottom(300);
        })
        .catch(err => {
          console.log(err);
        });
    }
  } //addChat

  isChatPartner(senderEmail) {
    return senderEmail == this.chatpartner.email;
  } //isChatPartner
}
