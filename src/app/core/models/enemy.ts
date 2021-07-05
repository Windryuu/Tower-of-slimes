import { EnemyI } from "../interface/enemy-i";

export class Enemy implements EnemyI {
  name!:string;
  HP = 10;
  Force = 1;
  Intel = 1;
  Def = 1;
  Speed = 1;

  constructor(obj?:Partial<Enemy>) {
    if(obj) {
      Object.assign(this,obj);
    }
  }
}
