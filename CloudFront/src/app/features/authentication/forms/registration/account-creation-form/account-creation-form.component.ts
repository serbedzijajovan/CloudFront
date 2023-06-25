import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {NotificationService} from "../../../../../core/services/notification.service";
import {match} from "../../../../../shared/utilities/match.validator";
import {UserRegistrationDataService} from "../../../services/user-registration-data.service";
import {UserService} from "../../../../../core/services/user.service";

@Component({
  selector: 'app-account-creation-form',
  templateUrl: './account-creation-form.component.html',
  styleUrls: ['./account-creation-form.component.css']
})
export class AccountCreationFormComponent implements OnInit {
  activeTab = 'signup';
  lineLeft = 0;

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required,])
  }, {validators: [match('password', 'confirmPassword')]});

  referralForm = new FormGroup({
    referralUsername: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required,])
  }, {validators: [match('password', 'confirmPassword')]});

  @Output() onFormSubmit = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private registrationDataService: UserRegistrationDataService,) {
  }

  ngOnInit(): void {
  }

  submitForm() {
    let isReferral = false;
    let formValue = {};

    if (this.activeTab === "signup" && this.signupForm.valid) {
      formValue = this.signupForm.value;
    } else if (this.activeTab === "referral" && this.referralForm.valid) {
      formValue = this.referralForm.value;
      isReferral = true;
    } else {
      return;
    }

    this.userService.checkUsernameAvailability(this.referralForm.get('username')?.value ?? '').subscribe({
      next: () => {
        this.registrationDataService.setRegistrationData({isReferral: isReferral, data: formValue});
        this.onFormSubmit.emit();
      },
      error: (error) => {
        console.log(error);

        if (error.status == 409) {
          this.notificationService.showWarning("Username taken", "Username is already taken!", "topLeft");
        }

        this.registrationDataService.setRegistrationData({isReferral: isReferral, data: formValue});
        this.onFormSubmit.emit();
      }
    });
  }

  reset() {
    this.signupForm.reset();
    this.referralForm.reset();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (tab == "signup") {
      this.lineLeft = 0;
    } else {
      this.lineLeft = 200;
    }
  }
}
