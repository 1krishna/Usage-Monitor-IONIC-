import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  from: any;
  to: any;
  responce: any = null;
  alertController: any;

  constructor(
    private http: HTTP,
    private alertctrl: AlertController,
    private loadingctrl: LoadingController,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  async fetch() {
    let loading = await this.loadingctrl.create({
      message: 'Please Wait',
    });
    await loading.present();
    this.http.get('url', {}, {})
      .then(data => {
        this.loadingctrl.dismiss().then(a => console.log('dismissed'));
        console.log(data.data);
        this.responce = JSON.parse(data.data);
      })
      .catch(data => {
        this.loadingctrl.dismiss().then(a => console.log('dismissed'));
        console.log(data.err);
        this.responce = JSON.parse(data.err);
        this.alert(data.err);
      });
  }

  async alert(msg) {
    const alert = await this.alertctrl.create({
      header: 'Alert',
      message: msg,
      buttons: ["ok"]
    });
    await alert.present();
  }
}
