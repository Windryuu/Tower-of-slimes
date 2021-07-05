import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/core/models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-page-list-hero',
  templateUrl: './page-list-hero.component.html',
  styleUrls: ['./page-list-hero.component.scss']
})
export class PageListHeroComponent implements OnInit {

  public item$!:Observable<Hero>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private herosService: HeroService) {
                this.route.paramMap.subscribe((params)=> {
                  const id = Number(params.get('id'));
                  console.log(id);
                  this.item$= this.herosService.getItemById(id);
                })
               }

  ngOnInit(): void {

  }

  public edit(item:Hero):void {
    this.herosService.update(item).subscribe();

  }

}
