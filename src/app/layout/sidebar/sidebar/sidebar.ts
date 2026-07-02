import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AccountService } from '../../../features/services/account-service';
import { Router } from '@angular/router';
import { ShortenWordsPipe } from '../../../shared/pipes/shorten-word.pipe';

@Component({
  selector: 'tm-sidebar',
  imports: [CommonModule, ShortenWordsPipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  // Signal to hold the collapsed/expanded state
  accountService = inject(AccountService);
  private router = inject(Router);

  userInfo = this.accountService.userMetadata;
  isCollapsed = signal(false);

  ngOnInit(): void {
    console.log('Welcome to my Project');
  }

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
