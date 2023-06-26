import { Injectable } from '@angular/core';
import {UploadData} from "../models/upload-data";
import {catchError, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { saveAs } from 'file-saver';
import {FileResponse} from "../models/file-response";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'https://39f7siu2g1.execute-api.us-east-1.amazonaws.com/file';

  constructor(private http: HttpClient) {
  }

  downloadFile(albumName: string, fileName: string, extension: string,) {
    const api = `${this.apiUrl}/get`;
    const params = {
      album_name: albumName,
      file_name: fileName
    };

    this.http.get<FileResponse>(api, { params }).subscribe(response => {
      const data = response.file_content_base64;
      const byteCharacters = atob(data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: extension });

      const fullFilename = `${fileName}.${extension.split('/')[1]}`;

      saveAs(blob, fullFilename);
    });
  }

  uploadFile(uploadData: UploadData) {
    const api = `${this.apiUrl}/create`;
    return this.http.post(api, uploadData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteFile(albumName: string, fileName: string) {
    const api = `${this.apiUrl}/delete`;
    return this.http.delete(api, {
      params: {album_name: albumName, file_name: fileName}
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
