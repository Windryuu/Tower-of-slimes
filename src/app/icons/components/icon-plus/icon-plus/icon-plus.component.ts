import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icon-plus',
  templateUrl: './icon-plus.component.html',
  styleUrls: ['./icon-plus.component.scss']
})
export class IconPlusComponent implements OnInit {
  public myIcon = faPlus;
  constructor() { }

  ngOnInit(): void {
  }

}
