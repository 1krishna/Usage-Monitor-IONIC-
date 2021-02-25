import { Component } from '@angular/core';
import { PickerController, AlertController, Platform, LoadingController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { ActionSheetController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
// import { RefreshComponent } from '../components/refresh/refresh.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  spent = null;
  date: string='';
  anil: any='';
  vamsi: any='';
  sriram:any='';
  kk:any='';
  praneeth: any = '';
  reason:any=null;
  responce=[];


  add_amt(){
    this.c_alert();
    let h = 'http://43.227.129.132:8008/krishnakanth/add_amt.php?spent=' + this.spent + '&date=' + this.date + '&reason=' + this.reason + '&anil=' + this.anil + '&vamsi=' + this.vamsi + '&sriram=' + this.sriram + '&kk=' + this.kk + '&praneeth=' + this.praneeth;
    console.log(h);
  }

  constructor(
    private pickerCtrl: PickerController, 
    public alertController: AlertController,
    public actionSheet: ActionSheetController,
    private http :HTTP,
    private plt:Platform,
    private loadingctrl : LoadingController,
    ) {
    this.date = new Date().toISOString();
    this.responce=null;
  }
  
  

  async alert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ["ok"]
    });
    await alert.present();
  }

  async add(){
    let loading = await this.loadingctrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.http.get('http://43.227.129.132:8008/krishnakanth/add_amt.php?spent=' + this.spent + '&date=' + this.date + '&reason=' + this.reason + '&anil=' + this.anil + '&vamsi=' + this.vamsi + '&sriram=' + this.sriram + '&kk=' + this.kk+'&praneeth=' + this.praneeth,{},{})
    .then(
      data => {
        this.loadingctrl.dismiss().then(a => console.log('dismissed'));
      console.log(data.data); // data received by server
      this.responce = JSON.parse(data.data);
      this.alert(this.responce);
      this.spent = this.anil = this.vamsi = this.sriram = this.kk = this.praneeth = this.reason = null;
      
      })
      .catch(error => {
        this.loadingctrl.dismiss().then(a => console.log('dismissed'));
        this.alert(error.error);
        console.log(error.error); // error message as string
      });

  }


  async c_alert(){
    const alert = await this.alertController.create({
      header : 'Alert',
      message : 'Confirm to Submit',
      buttons:[
        {
          text: "Cancel",
          role: 'cancel',
          handler: ()=>{
            this.alert("Submission Canceled");
          }
        },
        {
          text: "Submit",
          role: 'ok',
          handler: () => {
            if(this.spent==null){
              this.alert("Select Person Who Spent");
            } else if(this.reason==null){
              this.alert("Enter The Reason For Money Spent");
            }
            else{
              this.add();
            }
          }
        },
    ]
    });
    await alert.present();
  }

  async showBasicPicker() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done'
        }
      ],
      columns: [
        {
          name: 'spent_by',
          options: [
            { text: 'anil', value: 'anil' },
            { text: 'vamsi', value: 'vamsi' },
            { text: 'sriram', value: 'sriram' },
            { text: 'kk', value: 'kk' },
            { text: 'praneeth', value: 'praneeth' }
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('spent_by');
      this.spent = col.options[col.selectedIndex].text;
    });
  }
}
