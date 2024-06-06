import { Component } from '@angular/core';
import { MenuSidebar } from '../@theme/components';


const menuSidebar: MenuSidebar[] = [
  { icon: "fas fa-home", text: "Home", action: 'pages/products/table', childs: null },
  { icon: "fas fa-user", text: "Profile", action: 'pages/user/profile', childs: null },
  {icon: "fas fa-table", text: "Paginate", action: 'pages/products/table-paginate', childs: null},
  {icon: "fas fa-table", text: "InfinteScroll", action: 'pages/products/table-scroll', childs: null},
  { icon: "fas fa-sing-out", text: "Logout", action: 'logout', childs: null },
]
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent {

  public menu: MenuSidebar[] = menuSidebar;
}

