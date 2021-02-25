import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  data:any;
  responce:any;
  temp:any;
  from:any;
  to:any;
  total:any=0;
  constructor(
    private activateroute:ActivatedRoute,
    private http:HTTP,
    private loadingCtrl:LoadingController,
    private alertCtrl: AlertController
    ) {
    this.activateroute.queryParams.subscribe(params=>{
      if(params){
        this.data=params;
        console.log(params);
      }
    });
    this.get_camt();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.total=0;
    this.get_camt();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async get_camt(){
    let loading = await this.loadingCtrl.create({
      message:'Please Wait'
    });
    // await loading.present();

    this.http.get('http://43.227.129.132:8008/krishnakanth/get_details.php',{
      from: this.data.from,
      to: this.data.to,
      status: this.data.status
    },{})
    .then( data =>{
      this.responce=JSON.parse(data.data);
      console.log(this.responce);
      for(var i=0;i<this.responce.length;i++){
        this.total += parseFloat(this.responce[i].amt);
        console.log("AMT:"+this.responce[i].amt);
        console.log("length:" + this.responce.length);
        console.log("total:"+this.total);
      }
      // this.loadingCtrl.dismiss().then(a => console.log('dismissed'));
    })
    .catch(data=>{
      this.responce = data.err;
      // this.loadingCtrl.dismiss().then(a => console.log('dismissed'));
      this.alert("Problem While Loading Try Again");      
    })
  }

  show(){
    console.log(this.responce);
  }

  async status_change(){
    let loading = await this.loadingCtrl.create({
      message:'Please Wait'
    });
    await loading.present();
    this.total=0;
    this.http.get('http://43.227.129.132:8008/krishnakanth/stat.chng.php', { info : JSON.stringify(this.responce)},{})
    .then(data=>{
      this.get_camt();
      this.loadingCtrl.dismiss().then(a => console.log('dismissed'));      
      this.alert(JSON.parse(data.data));
    })
    .catch(data=>{
      this.loadingCtrl.dismiss().then(a => console.log('dismissed'));      
      this.alert(data.err);
    });
  }

  async alert(msg){
    const alert = await this.alertCtrl.create({
      header: "Alert",
      message:msg,
      buttons:["ok"]
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
