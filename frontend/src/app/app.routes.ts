import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { DialogueComponent } from './pages/dialogue/dialogue.component';
import { QuestsComponent } from './pages/quests/quests.component';
import { EventsComponent } from './pages/events/events.component';
import { ChaptersComponent } from './pages/chapters/chapters.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'characters', component: CharactersComponent },
    { path: 'dialogue', component: DialogueComponent },
    { path: 'quests', component: QuestsComponent },
    { path: 'events', component: EventsComponent },
    { path: 'chapters', component: ChaptersComponent }
];