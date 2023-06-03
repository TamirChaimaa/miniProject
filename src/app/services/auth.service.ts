import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends DataService{


  constructor( http: HttpClient ) {
    super(http);
  }

  login(data: {email: string, password: string}){
    return this.sendPostRequest('login', data)
  }

  register(data: { name: any; email: any,  password: any; password_confirmation: any }) {

    return this.sendPostRequest('register', data)
  }

  registerPatient(data) {

    return this.sendPostRequest('registerPatient', data )
  }

  continueRegister(data, isFormData?: boolean) {

    return this.sendPostRequest('registerPatient', data, true )
  }

  updateProfile(data: any, isFormData?: boolean){
    return this.sendPostRequest('updateProfile', data, isFormData)
  }

  changePassword(data:{password: string, new_password: string, password_confirmation: string}){
    return this.sendPostRequest('changePassword', data)
  }

  verifyEmail(email: string){
    return this.sendPostRequest('verifyEmail', { email})
  }

  verifyPhone(phone_number: string){
    return this.sendPostRequest('verifyBySMS', { phone_number})
  }

  verifyCode(code: string){
    return this.sendPostRequest('VerifyCode', { code })
  }

  removeAccount(){
    return this.sendGetRequest('removeAccount', {})
  }



  signInAndSignUpSuccess(resp: any, authService: AuthService){
    authService.setToken(resp.Result.token);
    window.localStorage.setItem('user', JSON.stringify(resp.Result.user));

  }


  setToken(token: string){
    localStorage.setItem('token', token);
  }

  removeToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
  }

  static getToken(): string | null{
    return localStorage.getItem('token')
  }


  static getUser(): Object | null{
    const res = localStorage.getItem('user');
    if(!res) return null;
    return JSON.parse(res);
  }

  static setUser(user: Object){
    localStorage.setItem('user', JSON.stringify(user));
  }



  logout(){
    return this.sendGetRequest('logout', {})
  }

}
