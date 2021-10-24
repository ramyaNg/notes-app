import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hideSideNav:boolean = false;
  title:string = 'Note App';
  constructor( private notesService: NotesService ){}
  ngOnInit() {
    this.notesService.showHideSubscription.subscribe(() => {
      this.hideSideNav = !this.hideSideNav;
    });
  }
}
