import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.page.html',
  styleUrls: ['./refresh.page.scss'],
})
export class RefreshPage implements OnInit {

  constructor(private http : HTTP) { }

  ngOnInit() {
  }

  async onclick(){
    this.http.get("http://eassvijayawada.com/ug/get_result.php", { rollno:"180101"},
    {
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'http://localhost',
      
    })
    .then(data=>{
      console.log(data.headers);
    }).catch(data=>{
      console.log(data.headers);
    });
  }

}
