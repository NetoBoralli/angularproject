import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';

import { AppAuthGuard } from './services/auth/auth-app.guard';
import { LoginAuthGuard } from './services/auth/auth-login.guard';
import { DialogsService } from './services/dialog/dialog.service';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
	imports: [
		MaterialModule,
		LayoutModule,
		ComponentsModule
	],
	exports: [
		MaterialModule,
		LayoutModule,
		ComponentsModule,
		TruncatePipe
	],
	providers: [
		AppAuthGuard,
		LoginAuthGuard,
		DialogsService
	],
	declarations: [
		TruncatePipe
	]
})
export class SharedModule { }
