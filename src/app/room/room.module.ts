import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../shared/material/material.module';
import { AppRouting } from '../app.routing';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomService } from './shared/room.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppRouting,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    RoomListComponent
  ],
  providers: [
    RoomService
  ]
})
export class RoomModule { }
