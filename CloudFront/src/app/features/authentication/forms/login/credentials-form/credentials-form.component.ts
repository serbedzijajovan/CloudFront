import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../../core/services/notification.service";
import {AuthService} from "../../../../../core/services/auth.service";
import {Credentials} from "../../../models/credentials";

@Component({
  selector: 'app-login-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.css']
})
export class CredentialsFormComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  @Output() onBack = new EventEmitter<void>();
  @Output() onLoginSubmit = new EventEmitter<void>();
  @Output() onResetPassword = new EventEmitter<void>();
  @Output() renewPasswordRequired = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  onFormSubmit() {
    if (this.loginForm.valid) {
      const credentials: Credentials = {
        username: this.loginForm.controls['email'].value ?? '',
        password: this.loginForm.controls['password'].value ?? ''
      };

      this.authService.loginUser(credentials).subscribe({
        next: () => {
          this.onLoginSubmit.emit();
          this.notificationService.showSuccess("Logged", "You are logged in", 'topRight');
        },
        error: (error) => {
          if (error.status == 401 || error.status == 403) {
            this.notificationService.showWarning("Warning", "The credentials you entered are invalid!", 'topRight');
          } else {
            this.notificationService.showDefaultError('topRight');
          }
        }
      });
    }
  }

  reset() {
    this.loginForm.reset();
  }
}
