import { HeroI } from "../interface/hero-i";

export class Hero implements HeroI {
  name!:string;
  currentHP = 10;
  HP = 10;
  Force = 1;
  Intel = 1;
  Def = 1;
  Speed = 1;
  id!:number;
  AvailPoints = 5;
  Gold = 5;
  killCount =0;
  highscore = 0;
  champion = "Bweeeh";

  constructor(obj?:Partial<Hero>) {
    if(obj) {
      Object.assign(this,obj);
    }
  }
}
