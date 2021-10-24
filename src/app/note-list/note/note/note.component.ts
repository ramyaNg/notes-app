import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note} from '../../../note';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() note!: Note ;
  
   @Output('noteClicked') noteClicked = new EventEmitter();

  constructor() { 
  }

  ngOnInit() {
  }

  noteClickHandler() {
    this.noteClicked.emit();
  }

}
