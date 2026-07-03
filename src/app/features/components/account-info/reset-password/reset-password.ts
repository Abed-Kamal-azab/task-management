import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationService } from '../../../../core/services/validation.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account-service';

@Component({
  selector: 'tm-reset-password',
  imports: [ReactiveFormsModule, FormsModule, NgClass, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword implements OnInit {
  isVisible = signal(false);
  form!: FormGroup;
  formBuilder = inject(FormBuilder);
  accountService = inject(AccountService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isReady = false;
  isSubmitting = false;
  isSuccess = false;
  errorMessage = '';
  private accessToken = '';

  ngOnInit(): void {
    this.initFormModel();
    this.handleRecoveryToken();
  }

  initFormModel() {
    this.form = this.formBuilder.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(64),
            ValidationService.hasSpecialCharacter,
            ValidationService.hasNumber,
            ValidationService.hasLowercase,
            ValidationService.hasUppercase,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },

      {
        validators: ValidationService.mustMatch('newPassword', 'confirmPassword'),
      },
    );
  }

  resetPassword() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.accessToken) {
      this.errorMessage = 'Invalid or expired reset link.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.accountService.resetPassword({ password: this.form.get('newPassword')?.value }).subscribe({
      next: () => {
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'This reset link has expired or is invalid. Please request a new one.';
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  toggleVisibility() {
    this.isVisible.set(!this.isVisible());
  }

  private handleRecoveryToken() {
    const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '';
    const hashParams = new URLSearchParams(hash);
    const tokenFromHash = hashParams.get('access_token');
    const tokenFromQuery = this.route.snapshot.queryParamMap.get('access_token');

    const token = tokenFromQuery || tokenFromHash;

    if (token) {
      this.accessToken = token;
      this.isReady = true;
      return;
    }

    this.errorMessage = 'Invalid or expired reset link.';
  }
}
