import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Album} from "../models/album";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = 'https://39f7siu2g1.execute-api.us-east-1.amazonaws.com/album';

  constructor(private http: HttpClient) {
  }

  createAlbum(albumName: string) {
    const api = `${this.apiUrl}/create`;
    const payload = {
      album_name: albumName
    };

    return this.http.post(api, payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAlbum(albumName: string): Observable<Album> {
    const api = `${this.apiUrl}/get`;

    return this.http.get<Album>(api, {
      params: {album_name: albumName}
    }).pipe(
      catchError(this.handleError)
    );
  }

  removeAlbum(albumId: string) {
    return this.http.delete(`${this.apiUrl}/${albumId}`);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
