import { Injectable } from '@angular/core'
import { Http, RequestOptions, Headers} from '@angular/http'
import { map, filter, catchError, mergeMap } from 'rxjs/operators'
import { LocalStorage } from '@ngx-pwa/local-storage';
import { FormGroup } from '@angular/forms'
import { Observable, Subject } from 'rxjs'


@Injectable()
export class DesignService {

    registerClicked: boolean = false;
    secondScreenEnabled: boolean = true;
    categories = []

    currentStep = 1;
    
    user = {
        username: '',
        checkedDsgn: false,
        checkedNeedDsgn: false
    }

    contest = {
        category: '',
        subcategory: '',
        contestTitle: '',
        contestBrief: '',
        other: ''
    }

    listOfContests =[{}]

    isSubCatSelected : boolean = false
    isContestCreated : boolean = false
    constructor(private http: Http, 
    private localStorage: LocalStorage){

    }

    getAllUsers() {
        return this.http.get("http://localhost:9090/get-all").pipe(map((data) => {
            return data.text();
        }))
    }
    storeUser() {
        return this.localStorage.setItem('user', this.user)
    }

    getUser(){
        return this.localStorage.getItem('user')
    }

    login(user, password) {
        let headers = new Headers();
        let options = new RequestOptions({headers: headers})
        let body = {
            user1: user, 
            password1: password
        }
        return this.http.post("http://localhost:9090/search", body, options).pipe(map((data) => {
            return data.json();   
        }))      
    }

    register(user, password,  checkedDsgn, checkedNeedDsgn) {
        let headers = new Headers();
        let options = new RequestOptions({headers: headers})
        let body = {
            user1: user,
            password1: password,
            checkedDsgn: checkedDsgn,
            checkedNeedDsgn: checkedNeedDsgn}
        return this.http.post("http://localhost:9090/addUser", body, options).pipe(map((data) => {
            return data.text();   
        }))
    }

    getContests(category, subcategory) {
        let headers = new Headers();
        let options = new RequestOptions({headers: headers})
        let body = {
            'category': category,
            'subcategory': subcategory,
            }

        return this.http.post("http://localhost:9090/getContest", body, options).pipe(map((data) => {
            return data.text();   
        }))
    }

    getAllContests() {
        return this.http.get("http://localhost:9090/getAllContests").pipe(map((data) => {
         return (<any>data)._body
    }))
    }
    createContest(){
        JSON.stringify(this.contest)
    }

    saveContest () {
        let headers = new Headers();
        let options = new RequestOptions({headers: headers})

        return this.http.post("http://localhost:9090/saveContest", this.contest, options).pipe(map((data) => {
            return data;   
        }))
    }
}