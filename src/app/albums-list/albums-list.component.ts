import { Component, OnInit } from '@angular/core';
import {AuthService} from "../core/auth.service";

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

    logout() {
        this.auth.signOut();
    }

}
