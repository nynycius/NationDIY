import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getProfile(userId: string) {
    return this.httpClient.get<any>(`https://nation-diy.vercel.app/users/${userId}`)
  }
}
