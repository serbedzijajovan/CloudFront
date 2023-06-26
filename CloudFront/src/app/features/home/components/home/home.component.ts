import {Component, ViewChild} from '@angular/core';
import {NavigationComponent} from "../navigation/navigation.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild(NavigationComponent) navigationComponent!: NavigationComponent;

  contentExpanded :boolean = false;

  constructor() {}

  toggleMenu() {
    this.navigationComponent.toggleMenu();
    this.contentExpanded = !this.contentExpanded;
  }

  onToggleSideNav($event: any) {
    this.contentExpanded = true;
  }
}
