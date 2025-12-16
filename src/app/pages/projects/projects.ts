import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  projects: any[] = [];

  http = inject(HttpClient);
  router = inject(Router);

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.http.get("/api/EmployeeManagement/GetAllProjects").subscribe({
      next: (res: any) => {
        console.log('Projects API Response:', res);
        if (Array.isArray(res)) {
          this.projects = res;
          console.log('Projects loaded:', this.projects.length);
        } else {
          this.projects = [];
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }
}

