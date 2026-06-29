import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AccountService } from '../../../features/services/account-service';
import { Router } from '@angular/router';

@Component({
  selector: 'tm-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  // Signal to hold the collapsed/expanded state
  private accountService = inject(AccountService);
  private router = inject(Router);

  isCollapsed = signal(false);

  toggleSidebar() {
    this.isCollapsed.update((val) => !val);
  }
  logout() {
    const password = prompt('Please, Enter Your Password to LogOut');
    console.log(password);
    this.accountService.logOut({ password }).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      complete: () => {},
      error: () => {},
    });
  }
}
