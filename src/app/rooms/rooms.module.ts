import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '../shared/material/material.module';
import { AppRouting } from '../app.routing';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomsService } from './shared/rooms.service';
import { RoomComponent } from './room/room.component';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MaterialModule,
    AppRouting,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    RoomListComponent,
    RoomComponent,
    QuestionsComponent
  ],
  providers: [
    RoomsService
  ]
})
export class RoomsModule { }
