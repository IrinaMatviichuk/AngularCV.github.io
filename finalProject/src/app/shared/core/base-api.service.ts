import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseApiService {
  private baseUrl = 'http://localhost:3000/';
  constructor(public http: HttpClient) {
  }
  private getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }
  public get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url));
  }
  public post(url: string = '', data: any = {}, option: any = 'response'): Observable<any> {
    return this.http.post(this.getUrl(url), data, {observe: option});
  }
  public put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data);
  }
  public delete(url: string = ''): Observable<any> {
    return this.http.delete(this.getUrl(url));
  }
}
