import { Injectable } from '@angular/core';
import {UploadData} from "../models/upload-data";
import {catchError, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'https://39f7siu2g1.execute-api.us-east-1.amazonaws.com/file';

  constructor(private http: HttpClient) {
  }

  uploadFile(uploadData: UploadData) {
    const api = `${this.apiUrl}/create`;
    return this.http.post(api, uploadData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
