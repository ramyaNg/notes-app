import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteInputComponent } from './note-input/note-input.component';
import { AppRoutingModule } from './app-routing.module';
import { NoteComponent } from './note-list/note/note/note.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import {NotesService} from '../app/notes.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NoteListComponent,
    NoteInputComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
