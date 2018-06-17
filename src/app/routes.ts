import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyComponent } from './quiz/survey/survey.component';
import { ResultComponent } from './result/result.component';
import { DadquizComponent } from './quiz/dadquiz/dadquiz.component';

export const router: Routes = [
  { path: '', redirectTo: 'survey', pathMatch: 'full'},
  { path: 'survey', component: SurveyComponent },
  { path: 'dad', component: DadquizComponent },
  { path: 'result', component: ResultComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
