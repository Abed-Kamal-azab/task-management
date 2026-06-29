import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class ValidationService {
  static mustMatch(controlName: string, matchControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const control = abstractControl.get(controlName);
      const matchControl = abstractControl.get(matchControlName);

      if (!control || !matchControl) {
        return null;
      }
      if (matchControl.errors && !matchControl.errors['mustMatch']) {
        return null;
      }
      const isMatching = control.value === matchControl.value;
      if (isMatching) {
        matchControl.setErrors(null);
        return null;
      } else {
        matchControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      }
    };
  }

  static hasUppercase(control: AbstractControl): ValidationErrors | null {
    if (!/[A-Z]/.test(control.value)) {
      return { hasUppercase: true };
    }
    return null;
  }

  static hasLowercase(control: AbstractControl): ValidationErrors | null {
    if (!/[a-z]/.test(control.value)) {
      return { hasLowercase: true };
    }
    return null;
  }

  static hasNumber(control: AbstractControl): ValidationErrors | null {
    if (!/[0-9]/.test(control.value)) {
      return { hasNumber: true };
    }
    return null;
  }

  static hasSpecialCharacter(control: AbstractControl): ValidationErrors | null {
    if (!/[!@#$%^&*]/.test(control.value)) {
      return { hasSpecialCharacter: true };
    }
    return null;
  }
}
