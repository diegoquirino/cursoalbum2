import { Component, OnInit } from '@angular/core';
import { AuthService } from "../core/auth.service";

@Component({
    selector: 'app-main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

    constructor(private auth: AuthService) { }

    logout(){
        this.auth.signOut();
    }
}
