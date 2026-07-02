import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account-service';
import { SignInRequest, SignInResponse } from '../../../../models/accounts.model';

@Component({
  selector: 'tm-login',
  imports: [ReactiveFormsModule, FormsModule, NgClass, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  form!: FormGroup;
  formBuilder = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);
  isVisible = signal(false);

  ngOnInit(): void {
    this.initFormModule();
  }

  initFormModule() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      checkbox: [false],
    });
  }
  login() {
    if (this.form.valid) {
      const loginData: SignInRequest = {
        email: this.form.value.email,
        password: this.form.value.password,
      };

      this.accountService.logIn(loginData).subscribe({
        next: (res: SignInResponse) => {
          console.log(res);
          // console.log(res?.user?.user_metadata?.department);
          // console.log(res?.user?.user_metadata?.name);
          this.router.navigate(['/projects']);
        },
        complete: () => {},
        error: () => {},
      });
    }
  }

  toggleVisibility() {
    this.isVisible.set(!this.isVisible());
  }
  get emailControl() {
    return this.form.get('email')!;
  }
  get passwordControl() {
    return this.form.get('password')!;
  }
}
