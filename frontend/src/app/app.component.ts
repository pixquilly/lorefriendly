import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


import { HomeComponent } from './pages/home/home.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { DialogueComponent } from './pages/dialogue/dialogue.component';
import { QuestsComponent } from './pages/quests/quests.component';
import { EventsComponent } from './pages/events/events.component';
import { ChaptersComponent } from './pages/chapters/chapters.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, CharactersComponent, DialogueComponent, QuestsComponent, EventsComponent, ChaptersComponent, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LoreFriendly';
  readonly baseUrl = 'http://localhost:3000';
}