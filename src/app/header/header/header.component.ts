import { Component, OnInit } from '@angular/core';
import {NotesService} from '../../notes.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isNoteSeelcted : boolean = false;
  constructor(private notesService:NotesService) { }

  ngOnInit(): void {
    this.notesService.noteClickSubscription.subscribe((note) => {
      debugger;
      this.isNoteSeelcted = true;
      // this.note = note;
      // this.bodyTextarea.nativeElement.value = this.note.body;
      // this.titleTextarea.nativeElement.value = this.note.title;
      // this.titleTextarea.nativeElement.focus();
    });
  }
  noteDeleteHandler(){
    this.notesService.noteDeleteHandler();
    this.isNoteSeelcted = false;
  }

  noteAddEditHandler() {
    this.notesService.noteAddEditHandler();
    this.isNoteSeelcted = true;
  }

  sideNavToggleHandler()
  {
    this.notesService.noteToggleHandler();
  }

  noteSearchHandler(event:any)
  {
    this.notesService.searchHandler(event.value);
  }
}
