import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FileFolderRowComponent } from './components/file-folder-row/file-folder-row.component';
import {MyAlbumsComponent} from "./components/my-albums/my-albums.component";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CreateAlbumDialogComponent } from './dialogs/create-album-dialog/create-album-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    MyAlbumsComponent,
    FileFolderRowComponent,
    CreateAlbumDialogComponent
  ],
  exports: [
    FileFolderRowComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgOptimizedImage,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FileManagerModule { }
