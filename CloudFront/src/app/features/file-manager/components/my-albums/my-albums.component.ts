import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Album} from "../../models/album";
import {AlbumService} from "../../services/album.service";
import {NotificationService} from "../../../../core/services/notification.service";
import {Subalbum} from "../../models/subalbum";
import {File} from "../../models/file";
import {MatDialog} from "@angular/material/dialog";
import {CreateAlbumDialogComponent} from "../../dialogs/create-album-dialog/create-album-dialog.component";
import {UploadFileDialogComponent} from "../../dialogs/upload-file-dialog/upload-file-dialog.component";

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
export class MyAlbumsComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private router: Router,
              private albumService: AlbumService,
              private notificationService: NotificationService,
              private dialog: MatDialog) {
  }

  albumName: string = "";
  album: Album | null = null;
  allItems: (File | Subalbum)[] = [];
  path: string[] = [];
  pathWithoutLast: string[] = [];

  ngOnInit(): void {
    this.navigateHome();
  }

  refresh() {
    this.navigateToAlbum(this.albumName);
  }

  navigateHome(): void {
    this.navigate('INITIAL');
    this.path = [];
  }

  navigateToAlbum(albumName: string) {
    this.navigate(albumName);
    this.path = albumName.split('/');
    this.pathWithoutLast = this.path.slice(0, -1);
  }

  navigateToFolderInPath(index: number): void {
    const newPath = this.path.slice(0, index + 1);
    this.navigateToAlbum(newPath.join('/'));
  }

  navigate(albumName: string) {
    this.albumName = albumName;
    this.fetchAlbum(albumName);
  }

  fetchAlbum(albumName: string) {
    this.albumService.getAlbum(albumName).subscribe({
      next: (album) => {
        this.album = album;
        this.allItems = [...album.files, ...album.subalbums];
      },
      error: (error) => {
        if (this.albumName != "INITIAL") {
          this.router.navigate(['home']);
        }
        this.notificationService.showDefaultError("topRight");
      }
    })
  }

  openCreateAlbumDialog() {
    const dialogRef = this.dialog.open(CreateAlbumDialogComponent, {
      data: {
        currentPath: this.albumName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.notificationService.showSuccess("Album created", "Album created successfully", "topRight");
        this.refresh();
      }
    });
  }

  openUploadFileDialog() {
    const dialogRef = this.dialog.open(UploadFileDialogComponent, {
      data: {
        currentPath: this.albumName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.notificationService.showSuccess("File updated", "File updated successfully", "topRight");
        this.refresh();
      }
    });
  }
}
