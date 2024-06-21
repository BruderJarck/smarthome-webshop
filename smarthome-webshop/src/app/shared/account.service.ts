import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RespModel } from '../models';
import { UserModel } from '../models';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  tokenPayload: string = ""
  accessToken: string = ""
  refreshToken: string = ""
  expirationDateAccess: string = ""
  expirationDateRefresh: string = ""

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  private baseURL = environment.baseURL
  private usersURL = this.baseURL + 'users/';

  canActivate(): boolean {
    if (this.isExpired(localStorage.getItem('refresh') || '')) {
      this.router.navigate(['/']);
      this.sharedService.loginFailed.next(true)
      return false;
    }
    return true;
  }

  getAccessTokenPayload() {
    return JSON.stringify(this.jwtHelper.decodeToken(this.accessToken));
  }

  getTokenExpirationDate(token: string) {
    var expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    return expirationDate;
  }

  isExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  isLoggedIn(): boolean {
    var isAccessExpired = this.jwtHelper.isTokenExpired(localStorage.getItem("access") || "")
    var isRefreshExpired = this.jwtHelper.isTokenExpired(localStorage.getItem("refresh") || "")
    return !isAccessExpired || !isRefreshExpired
  }

  login(username: string, password: string) {
    this.logout();

    return this.http.post<UserModel>(`${this.baseURL}api/token/`, { username, password }).pipe(
      tap((res) => {
        this.saveTokenObservable(res, false).pipe(
          switchMap(() => this.getUserByUsername(username))
        ).subscribe(
          (user) => {
            localStorage.setItem('username', user.username);
            localStorage.setItem('email', user.email);
            localStorage.setItem('profile_pic', user.profile_picture);
            localStorage.setItem('id', String(user.id));

          },
          (err) => {
            this.sharedService.loginFailed.next(true);
          }
        );
      })
    );
  }

  refreshLogin() {
    return this.http
      .post<RespModel>(
        this.baseURL + 'api/token/refresh/',
        { refresh: localStorage.getItem('refresh') }
      )
      .pipe(
        tap((res) => this.saveTokens(res, true))
      );
  }

  saveTokenObservable(res: any, refresh: boolean): Observable<string> {
    return of(this.saveTokens(res, refresh))
  }


  saveTokens(res: any, refresh: boolean): string {
    var accessToken: string = res['access'];
    var refreshToken: string = res['refresh'];

    //if access token is refreshed there is no new refresh token.
    //This is implemented not to overwrite refresh-token to undefined.
    if (refresh) {
      this.accessToken = accessToken;
      localStorage.setItem('access', accessToken);
    } else {
      this.accessToken = accessToken;
      localStorage.setItem('access', accessToken);
      this.refreshToken = refreshToken;
      localStorage.setItem('refresh', refreshToken);
    }

    return accessToken
  }

  logout() {
    this.sharedService.loginFailed.next(false)
    this.router.navigateByUrl('/webshop/product-list')
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    localStorage.removeItem('profile_pic')
    localStorage.removeItem('id')
  }

  getAllUseres(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.usersURL}`);
  }

  getCurrentUser(): Observable<UserModel> {
    return this.getUserById(Number(localStorage.getItem("id") || ""))
  }

  getUserById(id: number): Observable<UserModel> {
    const url = this.usersURL + id;
    return this.http.get<UserModel>(url);
  }

  getUserByUsername(username: string): Observable<UserModel> {
    if (!username.trim()) {
      return of();
    }
    return this.http.get<UserModel>(`${this.usersURL}${username}/`);
  }

  getEmail(email: string) {
    if (!email.trim()) { return of([]); }
    return this.http.get(`${this.baseURL}?search=${email}`);
  }

  registerNewUser(uploadData: FormData) {
    return this.http.post<UserModel>(this.baseURL + 'register-new-user/', uploadData)
  }
}
