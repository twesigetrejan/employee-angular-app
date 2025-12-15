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
  paginatedEmployees: EmployeeModel[] = [];
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 0;

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
        if (Array.isArray(res)) {
          this.employees = res;
        } else {
          this.employees = [];
          console.error('Unexpected response structure:', res);
        }
        console.log('Employees loaded:', this.employees.length);
        this.updatePagination();
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.employees.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEmployees = this.employees.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  get startRecord(): number {
    return this.employees.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endRecord(): number {
    return Math.min(this.currentPage * this.pageSize, this.employees.length);
  }
}
