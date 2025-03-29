import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { UserI } from '../../interfaces/user.interface';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { decodeToken } from 'src/app/shared/utils/jwt.utils';
import Pubsub from 'pubsub-js';

@Component({
  selector: 'mf-security-user-form',
  templateUrl: './user-form.component.html',
  imports: [ReactiveFormsModule],
})
export class UserFormComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  user = signal<UserI | null>(null);
  userForm!: UntypedFormGroup;

  private _userService = inject(UserService);
  private _untypedFormBuilder = inject(UntypedFormBuilder);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor() {
    this.userForm = this._untypedFormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required, Validators.maxLength(100)]],
      lastname: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    const tokenPayload = decodeToken();
    this._userService
      .getUserById(tokenPayload.id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.user.set(response.data);
          this.userForm.patchValue(response.data);
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  onUpdate() {
    if (this.userForm.invalid) return;

    this.loading = true;
    const payload = this.userForm.value as UserI;

    this._userService
      .updateUser(this.user()!.id!, payload)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.user.set(response.data);
          Pubsub.publish('success', 'Usuario actualizado correctamente.');
        },
        error: (_err) => {
          this.loading = false;
        },
      });
  }
}
