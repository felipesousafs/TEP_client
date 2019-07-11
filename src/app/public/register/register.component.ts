import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MustMatch} from '../../_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'passwordConfirmation')
    });
  }

  ngOnInit() {
  }

  doRegister() {
    const val = this.form.value;
    console.log(this.form);
    if (this.form.valid) {
      const data = {
        name: val.name,
        email: val.email,
        username: val.username,
        password: val.password,
        passwordConfirmation: val.passwordConfirmation
      };
      this.authService.register(data);
    }
  }

}
