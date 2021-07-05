import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-full-width',
  templateUrl: './template-full-width.component.html',
  styleUrls: ['./template-full-width.component.scss']
})
export class TemplateFullWidthComponent implements OnInit {
  // titre qui sera injecté comme attribut de la balise
  @Input() public title!: string;
  constructor() { }

  ngOnInit(): void {
  }



}
