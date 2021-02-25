import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-camt',
  templateUrl: './camt.page.html',
  styleUrls: ['./camt.page.scss'],
})
export class CamtPage implements OnInit {

  from:any;
  to:any;
  data:any;
  constructor(private route:Router ) { }
  details(){
    let navigationextras:NavigationExtras = {
      queryParams:{
        from: this.from,
        to: this.to,
        status: 1
      }
    }
    this.route.navigate(['Cdetails'], navigationextras);
  }


  exchange(){
    let temp=this.from;
    this.from=this.to;
    this.to=temp;
    console.log("hell");
  }
  ngOnInit() {
  }  
}
