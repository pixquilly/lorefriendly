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
  message_content: String = '';
  submitting: boolean = false;
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
  list_of_traits: any = null;
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
  traits: string[] = [];
  characters: any = '';
  composed: String = '';
  sensitive: String = '';
  talkative: String = '';
  honorable: String = '';
  realistic: String = '';
  humorous: String = '';
  optimistic: String = '';
  kind: String = '';
  generous: String = '';
  empathetic: String = '';

  // Stats (Max)
  hp: Number = 100;
  sp: Number = 100;
  mp: Number = 100;
  speed: Number = 10;
  hunger: Number = 100;
  thirst: Number = 100;
  energy: Number = 100;

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
  get_chosen_traits(event: Event){
    let elm = event.target as HTMLInputElement;
    elm.checked && (!this.traits.includes(elm.value)) ? this.traits.push(elm.value) : this.traits = this.traits.filter(trait => trait !== elm.value);
  }
  
  sendFormData() {
    if(this.submitting) {return};
    this.submitting = true; 

    let message: Array<string> = [];
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
        this.populate_message('character saved.', 'info');
      },
      error: (error) => {
        console.error('Error:', error);
        this.populate_message('something wrong happened.', 'error');
        this.submitting = false; // Re-enable button
      },
      complete: () => {
        this.submitting = false; // Re-enable button
      }
    });
  }
  populate_message(message: string, _class: string){
    let elm = document.querySelector('#message') as HTMLElement;
    this.message_content = message;
    elm.classList.add(_class);
    elm.style.display = 'flex';
  }
  hide_parent(event: Event){
    let elm = event.target as HTMLElement;
    let parent = elm.parentNode as HTMLElement;
    parent.style.display = 'none';
  }

}