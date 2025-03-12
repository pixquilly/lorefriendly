import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class CharactersComponent {
  data: any;
  fname: string = '';
  mname: string = ''; 
  lname: string = '';
  nicknames: Array<string> = [];
  titles: Array<string> = [];
  age: string = '';
  gender: string = '';
  race: string = '';
  bloodline: string = '';
  birthplace: string = '';
  // Traits
  list_of_traits: Array<Array<string>> = [
    ["COMPOSED", "HOTHEAD"],
    ["SENSITIVE", "COLD"],
    ["TALKATIVE", "QUIET"],
    ["HONORABLE", "UNPREDICTABLE"],
    ["REALISTIC", "HOPEFUL"],
    ["HUMOROUS", "SERIOUS"],
    ["OPTIMISTIC", "PESSIMISTIC"],
    ["KIND", "CRUEL"],
    ["GENEROUS", "SELFISH"],
    ["EMPATHETIC", "APATHETIC"]
  ];
  traits: Array<Array<string>> = [];
  composed: string = '';
  sensitive: string = '';
  talkative: string = '';
  honorable: string = '';
  realistic: string = '';
  humorous: string = '';
  optimistic: string = '';
  kind: string = '';
  generous: string = '';
  empathetic: string = '';

  // Stats (Max)
  hp: number = 0;
  sp: number = 0;
  mp: number = 0;
  speed: number = 0;
  hunger: number = 0;
  thirst: number = 0;
  energy: number = 0;
  constructor(private http: HttpClient) {}
  sendFormData(form: any) {
    let body = {
      fname: this.fname,
      mname: this.mname,
      lname: this.lname,
      nicknames: this.nicknames,
      titles: this.titles,
      age: this.age,
      gender: this.gender,
      race: this.race,
      bloodline: this.bloodline,
      place_of_birth: this.birthplace,
      traits: this.traits
    };
    this.http.post('http://localhost:3000/characters/insert', body).subscribe({
      next: (response) => {
        this.data = response; // Store the response
        console.log('Post successful:', response);

      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

}