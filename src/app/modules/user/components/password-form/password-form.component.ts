import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserService } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { matchPasswordValidator } from 'src/app/shared/utils/validators.utils';
import { UpdatePasswordI } from '../../interfaces/user.interface';
import { OtpComponent } from 'src/app/shared/components/otp/otp.component';
import { decodeToken } from 'src/app/shared/utils/jwt.utils';
import Pubsub from 'pubsub-js';

@Component({
  selector: 'mf-security-password-form',
  templateUrl: './password-form.component.html',
  imports: [FontAwesomeModule, ReactiveFormsModule, OtpComponent],
})
export class PasswordFormComponent implements OnInit, OnDestroy {
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  loading: boolean = false;
  loadingResendOtp: boolean = false;
  show: boolean = false;
  emailFormControl!: FormControl;
  resetPassword: boolean = false;
  resetPasswordForm!: UntypedFormGroup;
  message!: string;

  private _authenticationService = inject(AuthenticationService);
  private _userService = inject(UserService);
  private _untypedFormBuilder = inject(UntypedFormBuilder);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor() {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.resetPasswordForm = this._untypedFormBuilder.group(
      {
        otp: [
          '',
          [
            Validators.required,
            Validators.maxLength(8),
            Validators.minLength(8),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: matchPasswordValidator('password', 'confirmPassword') }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  showPassword() {
    this.show = !this.show;
  }

  resendOpt() {
    this.resetPasswordForm.reset();
    this.loadingResendOtp = true;
    this._authenticationService
      .resendOtp({ email: this.emailFormControl.value, type: 'R' })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.resetPasswordForm.reset();
          this.message = response.data;
          this.loadingResendOtp = false;
        },
        error: (_error) => {
          this.loadingResendOtp = false;
        },
      });
  }

  onForgetPassword() {
    if (this.emailFormControl.invalid) return;

    this.loading = true;

    this._authenticationService
      .forgetPassword(this.emailFormControl.value)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.message = response.data;
          this.loading = false;
          this.resetPassword = true;
        },
        error: (_error) => {
          this.loading = false;
        },
      });
  }

  updateOtp(otp: string | null) {
    this.resetPasswordForm.get('otp')!.setValue(otp);
  }

  onUpdatePassword() {
    if (this.resetPasswordForm.invalid) return;

    this.loading = true;

    const payload = {
      otp: this.resetPasswordForm.value.otp,
      password: this.resetPasswordForm.value.password,
    } as UpdatePasswordI;

    const tokenPayload = decodeToken();

    this._userService
      .updatePassword(tokenPayload.id, payload)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.resetPassword = false;
          Pubsub.publish('success', response.data);
        },
        error: (_error) => {
          this.loading = false;
        },
      });
  }
}
