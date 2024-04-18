import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export const required = Validators.required


export const minLength = (value: number) => Validators.minLength(value)
export const maxLength = (value: number) => Validators.maxLength(value)
export const pattern = (regex: string) => Validators.pattern(regex)  //'^[0-9]*$'