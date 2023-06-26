import {Component, Input, OnInit} from '@angular/core';
import {File} from "../../models/file";
import {Subalbum} from "../../models/subalbum";

@Component({
  selector: 'app-file-folder-row',
  templateUrl: './file-folder-row.component.html',
  styleUrls: ['./file-folder-row.component.css']
})
export class FileFolderRowComponent implements OnInit{
  @Input() item: File | Subalbum | null = null;
  @Input() navigateToAlbum!: (albumName: string) => void;

  isFile: boolean = false;

  constructor() {
  }

  ngOnInit() {
    if (this.item) {
      this.isFile = 'file_name' in this.item;
    }
  }

  handleClick(): void {
    if (!this.item) {
      return;
    }

    if (this.isFile) {
    } else {
      this.navigateToAlbum((this.item as Subalbum).name);
    }
  }

  getItemType(): string {
    if (!this.isFile) return 'folder';
    const fileType = (this.item as File).file_type;
    if (fileType.startsWith('audio')) return 'audio';
    if (fileType.startsWith('video')) return 'video';
    if (fileType.startsWith('text') || fileType.startsWith('application')) return 'text';
    if (fileType.startsWith('image')) return 'image';
    return 'unknown';
  }

  getImageSrc(): string {
    const itemType = this.getItemType();
    return `assets/images/album/${itemType}.svg`;
  }

  getName(): string {
    if (!this.item) return '';
    return this.isFile ? (this.item as File).file_name : (this.item as Subalbum).name.split('/').pop() || '';
  }

  getCreationTime(): string {
    if (!this.item) return '';
    return this.isFile ? (this.item as File).creation_time : (this.item as Subalbum).createdAt;
  }

  getLastModifiedTime(): string {
    if (!this.item) return '';
    // TODO: Replace with actual last modified time for Subalbum
    return this.isFile ? (this.item as File).last_modified_time : '10-10-2020';
  }

  getFileSize(): number | string {
    if (!this.item || !this.isFile) return '-';
    return (this.item as File).file_size;
  }
}
