import { NgClass } from '@angular/common';
import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account-service';
import { Button } from '../../../../shared/components/button/button';

@Component({
  selector: 'tm-forget-password',
  imports: [ReactiveFormsModule, FormsModule, NgClass, RouterLink, Button],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword implements OnInit, OnDestroy {
  form!: FormGroup;
  formBuilder = inject(FormBuilder);
  accountService = inject(AccountService);
  cdr = inject(ChangeDetectorRef);

  isSubmitting = false;
  showSuccessMessage = false;
  successMessage = 'If an account exists with this email, we’ve sent a password reset link.';
  errorMessage = '';
  resendAttempts = 0;
  cooldownSeconds = 0;
  private countdownTimer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.initFormModule();
  }

  ngOnDestroy(): void {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  }

  initFormModule() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendResetLink() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.accountService.forgetPassword({ email: this.emailControl.value.trim() }).subscribe({
      next: () => {
        this.showSuccessMessage = true;
        this.startCooldown();
      },
      error: () => {
        this.showSuccessMessage = true;
        this.startCooldown();
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  resend() {
    if (this.isResendDisabled()) {
      return;
    }

    this.resendAttempts += 1;
    this.sendResetLink();
  }

  get emailControl() {
    return this.form.get('email')!;
  }

  isResendDisabled(): boolean {
    return this.cooldownSeconds > 0;
  }

  formatCooldown(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  private startCooldown() {
    this.cooldownSeconds = 300;
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }

    this.countdownTimer = setInterval(() => {
      this.cooldownSeconds -= 1;
      this.cdr.markForCheck();
      if (this.cooldownSeconds <= 0) {
        this.cooldownSeconds = 0;
        clearInterval(this.countdownTimer!);
        this.countdownTimer = null;
      }
    }, 1000);
  }
}
