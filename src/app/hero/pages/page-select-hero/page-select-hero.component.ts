import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-select-hero',
  templateUrl: './page-select-hero.component.html',
  styleUrls: ['./page-select-hero.component.scss']
})
export class PageSelectHeroComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  gotoHero():void{
    //redirection vers clients/edit/:id
   this.router.navigate(['herolist','hero','1']);
  }
}
