import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationService } from '../../../../core/services/validation.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account-service';

@Component({
  selector: 'tm-sign-up',
  imports: [ReactiveFormsModule, FormsModule, NgClass, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp implements OnInit {
  form!: FormGroup;
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.initFormModel();
  }

  initFormModel() {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        jobTitle: [''],
        password: [
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
        validators: ValidationService.mustMatch('password', 'confirmPassword'),
      },
    );
  }

  signUp(): void {
    if (this.form.valid) {
      console.log('form is valid :', this.form.value);
      this.accountService.signUp(this.form.value).subscribe({
        next: () => {
          alert('You Are Sign Up Successfully');
          this.router.navigate(['/login']);
        },
        complete: () => {},
        error: () => {},
      });
    }
  }

  get nameControl() {
    return this.form.get('name')!;
  }

  get emailControl() {
    return this.form.get('email')!;
  }

  get confirmPasswordControl() {
    return this.form.get('confirmPassword')!;
  }
}
