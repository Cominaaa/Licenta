import { Component, Output, EventEmitter, OnInit } from '@angular/core'
import { templateJitUrl } from '@angular/compiler';
import { DesignService } from '../common/design.service';
import { MatStepper } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component ({
    selector: 'stepOne-view',
    templateUrl: 'step1.component.html',
    styleUrls: ['step1.component.css']
})
export class StepOneComponent implements OnInit {
constructor (private designService: DesignService,
            private _formBuilder: FormBuilder) {
            
}

values = [
     {
         category: 'Fashion',
         subcategories: ['t-shirt', 'pants']
     },
     {
         category: 'Web Design',
         subcategories: ['sites'] 
     }
 ]
 categorySelected;
 ngOnInit(){
    
 }
 selectCategory(index) {
     this.designService.contest.category = this.values[index].category;
     switch(index){
         case 0:
            this.categorySelected = 0;
            break;
         case 1:
            this.categorySelected = 1;
            break;
     }
 }

 selectSubcategory(category, subcategory) {
     if(this.designService.user.checkedNeedDsgn){
        this.designService.contest.subcategory = subcategory;
        this.designService.isSubCatSelected = true;
        this.designService.categories.push({
            user: this.designService.user.username,
            category: category,
            subcategory: subcategory
        })
     } else {
        this.designService.getContests(category, subcategory).subscribe(res=> console.log(res));
     }
    
 }
}