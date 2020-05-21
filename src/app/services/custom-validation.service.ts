import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }

  patternValidator(method: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      //regex for password validation
      if (method === "password") {
        const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
        const valid = regex.test(control.value);
        return valid ? null : { invalidPassword: true };
      }
      //regex for URL validation
      else if (method === "PlayURL") {
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        const valid = regex.test(control.value);
        return valid ? null : { invalidURL: true };
      }
      //regex for URL validation
      else if (method === "ImageURL") {
        const regex = new RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$');
        const valid = regex.test(control.value);
        return valid ? null : { invalidURL: true };
      }
    };
  }

}
