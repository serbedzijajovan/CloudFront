import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../../core/services/notification.service";
import {UserRegistrationDataService} from "../../../services/user-registration-data.service";
import {UserService} from "../../../../../core/services/user.service";
import {UserRegistrationData} from "../../../models/user-registration-data";
import {Router} from "@angular/router";

@Component({
  selector: 'app-more-info-form',
  templateUrl: './more-info-form.component.html',
  styleUrls: ['./more-info-form.component.css']
})
export class MoreInfoFormComponent implements OnInit{
  allTextPattern = "[a-zA-Z][a-zA-Z]*";
  datePattern = "^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-[12][0-9]{3}$";

  moreInfoForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(this.allTextPattern), Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.pattern(this.allTextPattern), Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dateOfBirth: new FormControl('', [Validators.required, Validators.pattern(this.datePattern)]),
  }, {});

  @Output() onBack = new EventEmitter<void>();
  @Output() onFormSubmit = new EventEmitter<void>();

  private formData: { isReferral: boolean, data: any } | null = null;

  constructor(
    private notificationService: NotificationService,
    private registrationDataService: UserRegistrationDataService,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.registrationDataService.getRegistrationData().subscribe(data => {
      this.formData = data;
    });
  }

  navigateBack() {
    this.onBack.emit();
  }

  submitForm() {
    this.router.navigate(['/login-register'], { skipLocationChange: true }).then(() => {
      window.location.reload()
      this.notificationService.showSuccess("Account successfully created", "Confirmation is sent to your email.", "topRight");
    });

    if (!this.moreInfoForm.valid || !this.formData) {
      return;
    }

    const user: UserRegistrationData = {
      first_name: this.moreInfoForm.get('name')?.value ?? '',
      last_name: this.moreInfoForm.get('surname')?.value ?? '',
      email: this.moreInfoForm.get('email')?.value ?? '',
      date_of_birth: this.moreInfoForm.get('dateOfBirth')?.value ?? '',
      username: this.formData.data.username,
      password: this.formData.data.password,
    };
  }

  reset() {
    this.moreInfoForm.reset();
  }
}
