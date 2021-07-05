import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/core/models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-page-edit-hero',
  templateUrl: './page-edit-hero.component.html',
  styleUrls: ['./page-edit-hero.component.scss']
})
export class PageEditHeroComponent implements OnInit {

  public item$!:Observable<Hero>;
  public id!:number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private herosService: HeroService) {
                this.route.paramMap.subscribe((params)=> {
                  this.id = Number(params.get('id'));
                  console.log(this.id);
                  this.item$= this.herosService.getItemById(this.id);
                })
               }

  ngOnInit(): void {

  }

  public edit(item:Hero):void {
    this.herosService.update(item).subscribe((res)=> {this.router.navigate(['herolist','hero',this.id]);
  });
  }

}
