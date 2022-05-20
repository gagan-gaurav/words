import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AnyForUntypedForms, FormControl } from '@angular/forms';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyC30_Zg4eS-dDVl5FGRVfkrxnssEnjaM0k",
  authDomain: "word-game-39b93.firebaseapp.com",
  databaseURL: "https://word-game-39b93-default-rtdb.firebaseio.com",
  projectId: "word-game-39b93",
  storageBucket: "word-game-39b93.appspot.com",
  messagingSenderId: "963132136684",
  appId: "1:963132136684:web:0f48490164efd14c5659c9"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


interface user{
  name: any;
  score: any;
  rank: any;
}

@Component({
  selector: 'app-cm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Leaders : any[] = [];

  got_data: boolean = false;

  refe = ref(database, 'leaderboard/'); // reference of the data.
  data: any;  // data from the firebase.

  showFiller = false;
  mode = new FormControl('over');
  @ViewChild('sidenav') sidenav: any;
  constructor() { 
    if(this.got_data === false) this.getdata();
    // let player : user;
    // for(const key in this.data){
    //   this.Leaders.push(key);
    // }
    // console.log('ldr',this.Leaders);
  }

  ngOnInit(): void {
  }

  event() {
    // console.log('ad');
    this.sidenav.toggle();
  }
  
  player: any;

  compare( a: any , b: any ) {
    if ( a.score > b.score ){
      return -1;
    }
    if ( a.score < b.score ){
      return 1;
    }
    return 0;
  }


  count: number = 1;

  getdata(){
    this.got_data = true;
    onValue(this.refe, (snapshot) => {
      this.count = 1;
      this.Leaders = [];
      this.data = snapshot.val();
      // console.log(this.data);
      this.player = this.data; 
      // console.log(this.player);
      for(const key in this.player){
        this.Leaders.push({name: this.player[key].player_name, score : this.player[key].score, rank: 0});
        // console.log(this.player[key].score);
      }
      // console.log("board:", this.Leaders);
      this.Leaders.sort(this.compare);

      for(const key in this.Leaders){
        this.Leaders[key].rank = this.count++;
      }
      // console.log("board:", this.Leaders);
      // console.log(Object.keys(this.data).length);
    });
  }

}
