import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  from:any;
  to:any;

  constructor(
    private route:Router
  ) { }

  details() {
    let navigationextras: NavigationExtras = {
      queryParams: {
        from: this.from,
        to: this.to,
        status: 0
      }
    }
    this.route.navigate(['Cdetails'], navigationextras);
  }

  exchange() {
    let temp = this.from;
    this.from = this.to;
    this.to = temp;
    console.log("hell");
  }

  ngOnInit() {
  }

}
