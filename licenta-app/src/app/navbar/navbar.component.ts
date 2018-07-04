import { Component, OnInit } from '@angular/core'
import { DesignService } from '../common/design.service';
import { MatStepper } from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})
export class NavComponent implements OnInit{
  
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup : FormGroup;

    constructor(private designService: DesignService,
        private _formBuilder: FormBuilder){
    }

    ngOnInit(){
        console.log(this.designService.user)

        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
            thirdCtrl: ['', Validators.required]
        });
    }
    next(stepper: MatStepper) {
        stepper.next()
    }
}
