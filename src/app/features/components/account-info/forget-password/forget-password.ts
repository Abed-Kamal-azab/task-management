import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tm-forget-password',
  imports: [ReactiveFormsModule, FormsModule, NgClass, RouterLink],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword implements OnInit {
  form!: FormGroup;
  formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initFormModule();
  }

  initFormModule() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  sendResetLink() {
    console.log('send reset link');
  }
  get emailControl() {
    return this.form.get('email')!;
  }
  resend() {
    console.log('abed kamal');
  }
}
