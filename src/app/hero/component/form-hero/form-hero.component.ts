import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hero } from 'src/app/core/models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-form-hero',
  templateUrl: './form-hero.component.html',
  styleUrls: ['./form-hero.component.scss']
})
export class FormHeroComponent implements OnInit {
  @Input() init!: Hero;
  @Output() submited: EventEmitter<Hero> = new EventEmitter<Hero>();
  public form!: FormGroup;
  public heros:Hero[] = [];





  constructor(private fb: FormBuilder, private heroService:HeroService) {
    heroService.collection.subscribe((data)=> {
      this.heros = data;
   });
  };

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.init.name],
      currentHP: [this.init.currentHP],
      HP: [this.init.HP,[Validators.max(this.init.HP+this.init.AvailPoints),Validators.min(0)]],
      Force: [this.init.Force,[Validators.max(this.init.Force+this.init.AvailPoints),Validators.min(0)]],
      Intel: [this.init.Intel,[Validators.max(this.init.Intel+this.init.AvailPoints),Validators.min(0)]],
      Def: [this.init.Def,[Validators.max(this.init.Def+this.init.AvailPoints),Validators.min(0)]],
      Speed:[this.init.Speed,[Validators.max(this.init.Speed+this.init.AvailPoints),Validators.min(0)]],
      id: [this.init.id],
      AvailPoints:[this.init.AvailPoints],
      Gold:[this.init.Gold],
      killCount:[this.init.killCount],
      highscore:[this.init.highscore],
      champion:[this.init.champion]
    })
  }



  public onSubmit():void{
    this.submited.emit(this.form.value);
  }
  /*public calcDef():void {
    console.log(this.form.controls.Def.value)
  }*/

  public calcHP():number {
    if(this.init.HP == 0) {
      if (  (this.form.controls.HP.value - this.init.HP)<=-1) {
        this.ngOnInit();
      }}  else {
      if(this.init.AvailPoints > 0 ) {
      this.init.AvailPoints = this.init.AvailPoints - ( this.form.controls.HP.value - this.init.HP)
      this.init.HP = this.form.controls.HP.value
      this.ngOnInit();
      return this.init.AvailPoints,this.init.HP;
    } else if (this.init.AvailPoints == 0) {
      if ((this.form.controls.HP.value - this.init.HP)>=1 ) {
        this.ngOnInit()
      } else if ((this.form.controls.HP.value - this.init.HP)<=-1) {
        this.init.AvailPoints = this.init.AvailPoints - ( this.form.controls.HP.value - this.init.HP)
        this.init.HP = this.form.controls.HP.value
        this.ngOnInit();
        return this.init.AvailPoints,this.init.HP;
      }
    }}
    return this.init.AvailPoints,this.init.HP
  }

  public calcForce():number {
    if(this.init.Force == 0) {
      if (  (this.form.controls.Force.value - this.init.Force)<=-1) {
        this.ngOnInit();
      }}  else {
      if(this.init.AvailPoints > 0 ) {
      this.init.AvailPoints = this.init.AvailPoints - ( this.form.controls.Force.value - this.init.Force)
      this.init.Force = this.form.controls.Force.value
      this.ngOnInit();
      return this.init.AvailPoints,this.init.Force;
    } else if (this.init.AvailPoints == 0) {
      if ((this.form.controls.Force.value - this.init.Force)>=1 ) {
        this.ngOnInit()
      } else if ((this.form.controls.Force.value - this.init.Force)<=-1) {
        this.init.AvailPoints = this.init.AvailPoints - ( this.form.controls.Force.value - this.init.Force)
        this.init.Force = this.form.controls.Force.value
        this.ngOnInit();
        return this.init.AvailPoints,this.init.Force;
      }
    }}
    return this.init.AvailPoints,this.init.Force
  }

  public calcIntel():number {
    if(this.init.Intel == 0) {
      if (  (this.form.controls.Intel.value - this.init.Intel)<=-1) {
        this.ngOnInit();
      }}  else {
      if(this.init.AvailPoints > 0 ) {
      this.init.AvailPoints = this.init.AvailPoints - ( this.form.controls.Intel.value - this.init.Intel)
      this.init.Intel = this.form.controls.Intel.value
      this.ngOnInit();
      return this.init.AvailPoints,this.init.Intel;
    } else if (this.init.AvailPoints == 0) {
      if ((this.form.controls.Intel.value - this.init.Intel)>=1 ) {
        this.ngOnInit()
      } else if ((this.form.controls.Intel.value - this.init.Intel)<=-1) {
        this.init.AvailPoints = this.init.AvailPoints - ( this.form.controls.Intel.value - this.init.Intel)
        this.init.Intel = this.form.controls.Intel.value
        this.ngOnInit();
        return this.init.AvailPoints,this.init.Intel;
      }
    }}
    return this.init.AvailPoints,this.init.Intel
  }

  public calcDef():number {
    if(this.init.Def == 0) {
      if (  (this.form.controls.Def.value - this.init.Def)<=-1) {
        this.ngOnInit();
      }}  else {
      if(this.init.AvailPoints > 0 ) {
      this.init.AvailPoints = this.init.AvailPoints - ( this.form.controls.Def.value - this.init.Def)
      this.init.Def = this.form.controls.Def.value
      this.ngOnInit();
      return this.init.AvailPoints,this.init.Def;
    } else if (this.init.AvailPoints == 0) {
      if ((this.form.controls.Def.value - this.init.Def)>=1 ) {
        this.ngOnInit()
      } else if ((this.form.controls.Def.value - this.init.Def)<=-1) {
        this.init.AvailPoints = this.init.AvailPoints - ( this.form.controls.Def.value - this.init.Def)
        this.init.Def = this.form.controls.Def.value
        this.ngOnInit();
        return this.init.AvailPoints,this.init.Def;
      }
    }}
    return this.init.AvailPoints,this.init.Def
  }

  public calcSpeed():number {
    if(this.init.Speed == 0) {
      if (  (this.form.controls.Speed.value - this.init.Speed)<=-1) {
        this.ngOnInit();
      }}  else {
      if(this.init.AvailPoints > 0 ) {
      this.init.AvailPoints = this.init.AvailPoints - ( this.form.controls.Speed.value - this.init.Speed)
      this.init.Speed = this.form.controls.Speed.value
      this.ngOnInit();
      return this.init.AvailPoints,this.init.Speed;
    } else if (this.init.AvailPoints == 0) {
      if ((this.form.controls.Speed.value - this.init.Speed)>=1 ) {
        this.ngOnInit()
      } else if ((this.form.controls.Speed.value - this.init.Speed)<=-1) {
        this.init.AvailPoints = this.init.AvailPoints - ( this.form.controls.Speed.value - this.init.Speed)
        this.init.Speed = this.form.controls.Speed.value
        this.ngOnInit();
        return this.init.AvailPoints,this.init.Speed;
      }
    }}
    return this.init.AvailPoints,this.init.Speed
  }


}
