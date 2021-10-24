import { Injectable } from '@angular/core';
import { Subject , BehaviorSubject} from 'rxjs';
import {Note} from "./note"

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  noteClickSubscription = new Subject();
  noteDetailSubscription = new Subject();
  noteSubscription = new Subject();
  showHideSubscription = new Subject();
  noteSearchSubscription = new Subject<string>();
  availableNotes: Note[] = [];
  constructor() { 
    this.availableNotes = [];
  }

  noteAddEditHandler() {
    this.noteSubscription.next({action: 'addEdit'});
  }

  noteDeleteHandler() {
    this.noteSubscription.next({action: 'delete'});
  }

  noteToggleHandler() {
    this.showHideSubscription.next();
  }

  searchHandler(searchString : string) {
    this.noteSearchSubscription.next(searchString);
  }
}
