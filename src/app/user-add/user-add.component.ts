import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  addForm: FormGroup;

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
      ]],
      secondName: ['', [
        Validators.required,
        Validators.minLength(2),
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
      ]]
    });

    this.addForm.valueChanges.subscribe(console.log);
  }

  get firstName() {
    return this.addForm.get('firstName');
  }

  get secondName() {
    return this.addForm.get('secondName');
  }
  get lastName() {
    return this.addForm.get('lastName');
  }
  addUser(): void {
    const users: Array<object> = JSON.parse(localStorage.getItem('users')) || [];
    users.push(this.addForm.value);

    localStorage.setItem('users', JSON.stringify(users));

    this.snackBar.open('Добавлен новый пользователь', 'Хорошо', {
      duration: 3000,
    });

    this.addForm.reset();
  }
}
