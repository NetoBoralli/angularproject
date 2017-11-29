import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
	MatIconModule,
	MatButtonModule,
	MatDialogModule,
	MatToolbarModule,
	MatInputModule,
	MatCardModule,
	MatSelectModule,
	MatFormFieldModule,
	MatProgressSpinnerModule,
	MatSidenavModule,
	MatExpansionModule
} from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		MatToolbarModule,
		MatButtonModule,
		MatDialogModule,
		MatInputModule,
		MatCardModule,
		MatSelectModule,
		MatFormFieldModule,
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatExpansionModule
	],
	exports: [
		CommonModule,
		MatIconModule,
		MatToolbarModule,
		MatButtonModule,
		MatDialogModule,
		MatInputModule,
		MatCardModule,
		MatSelectModule,
		MatFormFieldModule,
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatExpansionModule
	]
})
export class MaterialModule { }
