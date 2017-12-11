import { RoomsService } from './../../rooms/shared/rooms.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '../material/material.module';

import { LayoutComponent } from './layout.component';

@NgModule({
	imports: [
		MaterialModule,
		RouterModule,
		TranslateModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		LayoutComponent
	],
	exports: [
		LayoutComponent
	]
})
export class LayoutModule { }
