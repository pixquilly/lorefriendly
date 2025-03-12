import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class CharactersComponent {
  constructor(private http: HttpClient) {
    //constructor
    this.get_characters();
    this.get_traits();

  }
  baseUrl: string = "http://localhost:3000";
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
  list_of_traits: any = '';
  // list_of_traits: Array<Array<string>> = [
  //   ["COMPOSED", "HOTHEAD"],
  //   ["SENSITIVE", "COLD"],
  //   ["TALKATIVE", "QUIET"],
  //   ["HONORABLE", "UNPREDICTABLE"],
  //   ["REALISTIC", "HOPEFUL"],
  //   ["HUMOROUS", "SERIOUS"],
  //   ["OPTIMISTIC", "PESSIMISTIC"],
  //   ["KIND", "CRUEL"],
  //   ["GENEROUS", "SELFISH"],
  //   ["EMPATHETIC", "APATHETIC"]
  // ];
  traits: string = '';
  characters: any = '';
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
  hp: number = 100;
  sp: number = 100;
  mp: number = 100;
  speed: number = 10;
  hunger: number = 100;
  thirst: number = 100;
  energy: number = 100;

  get_characters(){
    this.http.get(this.baseUrl + '/characters/all').subscribe({
    next: (result)=>{
      this.characters = result;
    },
    error:(error)=>{
      console.warn("error:" + error);
    }
    });
  }
  get_traits(){
    this.http.get(this.baseUrl + '/traits/all').subscribe({
    next: (result)=>{
      this.list_of_traits = result;
    },
    error:(error)=>{
      console.warn("error:" + error);
    }
    });
  }
  
  sendFormData() {
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
    this.http.post(this.baseUrl + '/characters/insert', body).subscribe({
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