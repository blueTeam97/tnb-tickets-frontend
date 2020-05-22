import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrNotificationService } from '../services/notification.service';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit {

  message:string="";
  toastrIsActive:boolean=false;


  constructor(private toaster:ToastrService,
              private notifyService : ToastrNotificationService) {}

  

  ngOnInit(): void {
    this.notifyService.showSuccess(this.message,"");
  }

}
