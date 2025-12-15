import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  loginObject: any = {
  "userName": "",
  "password": ""
  };

  http = inject(HttpClient);
  router = inject(Router);

  onLogin(){
    this.http.post("/api/EmployeeManagement/login", this.loginObject).subscribe((res: any) => {
      if(res.result){
        localStorage.setItem("employeeApp", JSON.stringify(res.data));
        this.router.navigateByUrl("/dashboard");
      } else {
        alert(res.message);
      }
    });
  };}
