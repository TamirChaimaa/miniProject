import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, DJANGO_URL } from 'src/common/constants';

type RequestMethod = 'get' | 'post' | 'delete' | 'put';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  headers = new HttpHeaders({
    'Accept': 'application/json',
  });
  constructor(protected http: HttpClient) {
}

  checkCinImage(url: string, data: any, isFormData?: boolean): Observable<object>{
    return this.http.post(DJANGO_URL + url, data);
  }

  downloadPDF(pdfUrl: string): Observable<object> {

    return this.http.get(pdfUrl, { responseType: 'blob' });
  }
}