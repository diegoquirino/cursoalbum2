import { Component, OnInit } from '@angular/core';
import { AuthService } from "../core/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

    userForm: FormGroup;
    passReset: boolean = false;
    formErrors: FormErrors = {
        'email': '',
        'password': '',
    };
    validationMessages = {
        'email': {
            'required': 'Email is required.',
            'email': 'Email must be a valid email',
        },
        'password': {
            'required': 'Password is required.',
            'pattern': 'Password must not include spaces, tab or new line.',
            'minlength': 'Password must be at least 3 characters long.',
        },
    };

    constructor(private fb: FormBuilder, private auth: AuthService) { }

    ngOnInit() {
        this.buildForm();
    }

    login() {
        this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']);
    }

    buildForm() {
        this.userForm = this.fb.group({
            'email': ['fulano@gmail.com', [
                Validators.required,
                Validators.email
            ]
            ],
            'password': ['*********', [
                Validators.pattern("^(\\S+)$"),
                Validators.minLength(3),
            ]
            ],
        });
        this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // reset validation messages
    }

    // Updates validation state on form changes.
    onValueChanged(data?: any) {
        if (!this.userForm) { return; }
        const form = this.userForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

}
