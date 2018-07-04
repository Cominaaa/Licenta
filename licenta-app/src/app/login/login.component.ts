import { Component, OnInit } from '@angular/core'
import { DesignService } from '../common/design.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login-view',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    user = ""
    password = ""
    emailReg = ""
    passwordReg = ""
    checkedDsgn:boolean = false
    checkedNeedDsgn: boolean = false
    error = ""

    constructor(private designService : DesignService,
                private router: Router){

    }

    ngOnInit(){
        this.designService.getAllUsers().subscribe(res => {
            console.log(res)
        })
    }

    enableRegister(){
        this.designService.registerClicked = true;
    }

    registerUser() {
        this.designService.register(this.emailReg, this.passwordReg, this.checkedDsgn, this.checkedNeedDsgn).subscribe(res => {
            this.designService.registerClicked = false;
            alert(res)
        });
    }

    loginUser(){
        this.designService.login(this.user, this.password).subscribe(res => {
            console.log(res)
            if (res[0] != null) { 
                 this.designService.user.checkedDsgn = res[0].checkedDsgn;
                 this.designService.user.checkedNeedDsgn = res[0].checkedNeedDsgn;
                 this.designService.user.username = res[0].name;
                 this.designService.storeUser().subscribe(() => {
                    this.router.navigate(['dashboard'])
                 })
                
                 
            } else {
                this.error = "Invalid credentials"
            }
        })
        
    }


}