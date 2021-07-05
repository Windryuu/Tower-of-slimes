import { Component, OnInit } from '@angular/core';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icon-minus',
  templateUrl: './icon-minus.component.html',
  styleUrls: ['./icon-minus.component.scss']
})
export class IconMinusComponent implements OnInit {
  public myIcon = faMinus;
  constructor() { }

  ngOnInit(): void {
  }

}
