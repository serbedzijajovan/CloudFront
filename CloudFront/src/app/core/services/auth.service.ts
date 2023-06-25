import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../models/user";
import {environment} from "../../../environments/environment";
import {StorageService} from "./storage.service";
import {Credentials} from "../../features/authentication/models/credentials";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}`;
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private storageService: StorageService) {
  }

  loginUser(credentials: Credentials): Observable<any> {
    let api = `${this.apiUrl}/login`;
    return this.http.post(api, credentials).pipe(catchError(this.handleError));
  }

  isLoggedIn(): boolean {
    let authToken = this.getAuthToken();
    return authToken !== null;
  }

  logout() {
    this.storageService.clear();
  }

  setAuthToken(token: string) {
    this.storageService.setItem(this.tokenKey, token);
  }

  getAuthToken() {
    return this.storageService.getItem<string>(this.tokenKey);
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
