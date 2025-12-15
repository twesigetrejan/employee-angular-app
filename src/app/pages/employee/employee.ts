import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeeModel } from '../../model/employee';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  showModal = false;
  employees: EmployeeModel[] = [];

  http = inject(HttpClient);
  router = inject(Router);

  openEmployeeForm() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.http.get("/api/EmployeeManagement/GetAllEmployees").subscribe({
      next: (res: any) => {
        console.log('Full API Response:', res);
        // Handle different response structures
        if (Array.isArray(res)) {
          this.employees = res;
        } else if (res.data) {
          this.employees = res.data;
        } else if (res.result) {
          this.employees = res.result;
        } else {
          this.employees = [];
          console.error('Unexpected response structure:', res);
        }
        console.log('Employees loaded:', this.employees.length);
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }
}
