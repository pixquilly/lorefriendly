import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  imports: [CommonModule]
})
export class CharactersComponent {
  data: any = null;
  constructor(private http: HttpClient) {}
  sendFormData(form: any) {
    let body = {
      fname: form.fname
    };
    this.http.post('https://jsonplaceholder.typicode.com/todos/1', body).subscribe((response) => {
      this.data = JSON.stringify(response);
      alert(this.data);
    });
    alert("success")
  }

}