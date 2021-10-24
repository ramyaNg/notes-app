import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import {NotesService} from '../notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  notesList:Note[] = [];

  filteredNotes : any = [];
  selectedNote:any = null;

  searchedText:string = '';

  constructor(private notesService: NotesService) {
    // this.setDummyNote();
   }

  ngOnInit() {
    this.notesList =  <Note[]>JSON.parse( localStorage.getItem('notes') || '[]')
    this.filteredNotes = this.notesList;
    if(!this.notesList || this.notesList.length == 0 )
    {
      this.setDummyNote();
    }
    else{
      this.noteClickHandler( this.notesList[0] );
    }
    this.notesService.noteSearchSubscription.subscribe((value) => {
      debugger;
      this.filteredNotes = this.filterNotes(value);
    });
    this.notesService.noteDetailSubscription.subscribe((data: any) => {
      debugger;
      if ( data.note ) {
        const noteIndex = this.notesList.findIndex(note => note.id === data.note.id);
        this.notesList[noteIndex].body = data.value.body;
        this.notesList[noteIndex].title = data.value.title;
      } else {
        this.notesList[0].body = data.value.body;
        this.notesList[0].title = data.value.title;
      }
      localStorage.setItem('notes', JSON.stringify(this.notesList));
    });

    this.notesService.noteSubscription.subscribe((data: any) => {
      debugger;
      if ( data.action === 'delete' && this.selectedNote ) {
          this.notesList.splice(this.getSelectedNoteIndex(), 1);
          if(this.notesList.length === 0){
             this.setDummyNote();
          }
      }
      if ( data.action === 'addEdit' ) {
        let currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');    
        
        this.notesList.forEach(note => note.selected = false);
        this.notesList.unshift({
          id: Math.random() * 100,
          body: '',
          title: '',
          date: currentDate,
          selected: true
        });
        this.filteredNotes = this.notesList;
        this.noteClickHandler(this.notesList[0]);
      }
      localStorage.setItem('notes', JSON.stringify(this.notesList));
    });
  }

  setDummyNote() {
    let notes = JSON.parse(localStorage.getItem('notes') || '[]');
    if( !notes || notes && notes.length === 0 ){
      let currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');      
      const newNote = {
        id: Math.random() * 100,
        body: '',
        title: '',
        date: currentDate,
        selected: true
      };
      localStorage.setItem('notes', JSON.stringify([newNote])); 
      this.notesList = [newNote];
      this.filteredNotes = this.notesList;
      this.noteClickHandler(newNote);
      //this.notesService.noteClickSubscription.next(newNote);
    }
  }

  addNoteHandler(){
    this.setDummyNote();
  }

  getSelectedNoteIndex() {
    const index = this.notesList.findIndex( note => note.selected === true );
    this.selectedNote = this.notesList[index];
    return index;
  }

  removeSelection() {
    this.notesList.forEach(note => note.selected = false);
  }

  noteClickHandler(data:Note) {
    const index = this.notesList.findIndex( note => note.id === data.id );
    this.selectedNote = this.notesList[index];
    this.notesList.forEach(note => note.selected = false);
    this.notesList[index].selected = true;
    this.notesService.noteClickSubscription.next(this.notesList[index]);
  }

  filterNotes(value:string){
    if( value || (typeof value === 'string' && value.length === 0) ){
       this.searchedText = value; 
    }
    if( this.notesList && this.notesList.length > 0 ){
      return this.notesList.filter((note) => {
        if( this.searchedText.trim().length === 0 || 
          note.title.indexOf(this.searchedText.trim()) > -1 || 
          note.body.indexOf(this.searchedText.trim()) > -1 ){
          return true;
        } else {
          return false;
        }
    });
    } else {
      return [];
    }
    
  }


}
