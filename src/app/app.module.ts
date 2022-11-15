import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchResults } from './pages/search/search-results.component';
import { ShortlistDirective } from './directives/shortlist.directive';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, SearchResults, ShortlistDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
