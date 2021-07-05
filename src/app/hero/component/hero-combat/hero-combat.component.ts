import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Enemy } from 'src/app/core/models/enemy';
import { Hero } from 'src/app/core/models/hero';
import { EnemyService } from '../../services/enemy.service';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-combat',
  templateUrl: './hero-combat.component.html',
  styleUrls: ['./hero-combat.component.scss']
})
export class HeroCombatComponent implements OnInit {

  public enemy:Enemy[] = [];
  public heros:Hero[] = [];
  public collection$: Subject<Hero[]>; // pour les données
  public collection2$: Subject<Enemy[]>;
  public isEnemy=false;
  public opnmodif=false;
  public fakeLogs:String[] = [];
  private lootChance!:number;
  public willUpgrade = false;

  //////////////////////////
  public enemyCurrentHP!:number;
  public heroMort=false;

  public test="Green";


  @Input() init!: Hero;
  @Output() submited: EventEmitter<any> = new EventEmitter<any>();

  constructor(private herosService:HeroService, private enemyService:EnemyService,
    private router: Router,private fb: FormBuilder) {

    //récupération des données depuis l'API via le service
    this.collection$ = this.herosService.collection;
    this.collection2$ = this.enemyService.collection;

   }

   public form!: FormGroup;

  ngOnInit(): void {
    this.collection$.subscribe((data)=> {
      this.heros = data;
   });
    this.collection2$.subscribe((data)=> {
      this.enemy = data;})

      this.form = this.fb.group({
        name: [this.init.name],
        currentHP: [this.init.currentHP],
        HP: [this.init.HP],
        Force: [this.init.Force],
        Intel: [this.init.Intel],
        Def: [this.init.Def],
        Speed:[this.init.Speed],
        id: [this.init.id],
        AvailPoints:[this.init.AvailPoints],
        Gold:[this.init.Gold],
        killCount:[this.init.killCount],
        highscore:[this.init.highscore],
        champion:[this.init.champion]
      })
  }

  gotoEdit(id:number):void {
    this.router.navigate(['herolist','edit',id])

  }

  public enemyName!:string;
  public enemyCurrentMaxHP!:number;
  public enemyAtk!:number;
  public enemyDef!:number;
  public enemyInt!:number;
  public enemySpd!:number;
  public whichEnemy!:number;

  generateEnemy() {

    const randomEnemy= Math.floor(Math.random()*1000)

    if(randomEnemy < 10) {
      this.whichEnemy = 6
    } else if ( randomEnemy < 175 ) {
      this.whichEnemy = 0
    } else if (randomEnemy < 235) {
      this.whichEnemy = 1
    } else if (randomEnemy < 295) {
      this.whichEnemy = 2
    } else if (randomEnemy < 355) {
      this.whichEnemy = 3
    } else if (randomEnemy < 695) {
      this.whichEnemy = 0
    } else if (randomEnemy < 755) {
      this.whichEnemy = 4
    } else if (randomEnemy < 815) {
      this.whichEnemy = 5
    } else if (randomEnemy < 990) {
      this.whichEnemy = 0
    } else {
      this.whichEnemy = 6
    }

    this.enemyName = this.enemy[this.whichEnemy].name;
    this.enemyCurrentMaxHP = this.enemy[this.whichEnemy].HP + Math.floor( (0.4 * this.enemy[this.whichEnemy].HP * Math.random()) *this.init.killCount/7 );
    this.enemyCurrentHP = this.enemyCurrentMaxHP;
    this.enemyAtk = this.enemy[this.whichEnemy].Force + this.enemy[this.whichEnemy].Force*Math.floor(Math.random()*(this.init.killCount/6))
    this.enemyDef = this.enemy[this.whichEnemy].Def + this.enemy[this.whichEnemy].Def*Math.floor(Math.random()*(this.init.killCount/6))
    this.enemyInt = this.enemy[this.whichEnemy].Intel + this.enemy[this.whichEnemy].Intel*Math.floor(Math.random()*(this.init.killCount/6))
    this.enemySpd = this.enemy[this.whichEnemy].Speed + this.enemy[this.whichEnemy].Speed*Math.floor(Math.random()*(this.init.killCount/6))
    this.isEnemy = !this.isEnemy;
  }

  public ranAway = false;
  runAway(){
    this.isEnemy = !this.isEnemy;
    const lostGold = Math.floor(Math.random()*30)
    this.fakeLogs.push(`Vous perdez ${lostGold} Gold dans votre fuite`)
    this.init.Gold -= lostGold
  }

  openModif() {
    this.opnmodif = !this.opnmodif

  }

  revive(){
    this.opnmodif = !this.opnmodif
    this.heroMort = !this.heroMort;
    this.isEnemy = !this.isEnemy
    this.willUpgrade = !this.willUpgrade
    this.init.currentHP = this.init.HP
    this.statsReset();
    this.onSubmit();
  }


  public dmgHtoE!:number;
  public dmgEtoH!:number;
  public critDmgHtoE!:number;
  public critDmgEtoH!:number;

  DamageCalc(){
    this.dmgHtoE = this.init.Force - this.enemyDef;
    if(this.dmgHtoE < 0) {
      this.dmgHtoE = 0
    }
    this.dmgEtoH = this.enemyAtk - this.init.Def;
    if(this.dmgEtoH < 0){
      this.dmgEtoH = 0
    }
    this.critDmgHtoE = Math.floor((this.dmgHtoE)*1.7);
    this.critDmgEtoH = Math.floor((this.dmgEtoH)*1.7)
    return this.dmgHtoE,this.dmgEtoH,this.critDmgHtoE,this.dmgEtoH
  }

  public diffSpeed!:number;
  public ratioSpeed!:number;
  SpeedCalc() {
    this.diffSpeed = this.init.Speed - this.enemySpd;
    this.ratioSpeed = Math.floor(this.init.Speed- this.enemySpd);
    return this.diffSpeed
  }


  attack() {
    const critChance = Math.random()*200;
    const enemyCritChance = Math.random()*300;
    this.DamageCalc();
    this.SpeedCalc();


    if (this.diffSpeed >=0) {
      console.log(this.diffSpeed)
                if(critChance < this.init.Intel) {
                if (this.critDmgHtoE >= this.enemyCurrentHP) {
                    this.deathCounter();
                    this.randomLootVictory();
                    this.isEnemy = !this.isEnemy;
              } else {
                  //non-kill
                  if (enemyCritChance < this.enemyInt) {
                      this.critDoubleSensHeroFaster();
                } else {
                    this.critHeroandHeroFaster();
                  }
                }
            } else{
                if(this.dmgHtoE >= this.enemyCurrentHP) {
                  this.deathCounter();
                  this.randomLootVictory();
                  this.isEnemy = !this.isEnemy;
                } else {
                  //non-kill
                  if (enemyCritChance < this.enemyInt) {
                    this.critEnemyandHeroFaster();
                  } else {
                      this.nonCritDoubleSensHeroFaster();
                  }
                }}
    } else {
      console.log(this.diffSpeed)
      console.log("lent")
              if(critChance < this.init.Intel) {

                  if (enemyCritChance < this.enemyInt) {

                                  if (this.init.currentHP > this.critDmgEtoH) {
                                  this.init.currentHP = this.init.currentHP - this.critDmgEtoH;
                                  ;
                                      if (this.critDmgHtoE >= this.enemyCurrentHP) {
                                      this.fakeLogs.push(`${this.enemyName} vous a infligé ${this.critDmgEtoH} points de dégats critique, vous avez infligé ${this.critDmgHtoE} points de dégats critique à ${this.enemyName}`)
                                      this.randomLootVictory();
                                      this.isEnemy = !this.isEnemy;
                                  } else {
                                      this.enemyCurrentHP = this.enemyCurrentHP - this.critDmgHtoE
                                      this.fakeLogs.push(`${this.enemyName} vous a infligé ${this.critDmgEtoH} points de dégats critique, vous avez infligé ${this.critDmgHtoE} points de dégats critique à ${this.enemyName}`)
                                  }
                                } else {
                                  this.init.currentHP = 0;
                                  this.willUpgrade = !this.willUpgrade
                                  this.heroMort = !this.heroMort;
                                  this.fakeLogs.push(`Vous succombez aux ${this.critDmgEtoH} points de dégats critique de ${this.enemyName}.`)
                                }
                } else {
                                if (this.init.currentHP > this.dmgEtoH) {
                                  this.init.currentHP = this.init.currentHP - this.dmgEtoH;

                                      if (this.critDmgHtoE >= this.enemyCurrentHP) {
                                      this.fakeLogs.push(`${this.enemyName} vous a infligé ${this.dmgEtoH} points de dégats, vous avez infligé ${this.critDmgHtoE} points de dégats critique à ${this.enemyName}`)
                                      this.randomLootVictory();
                                      this.isEnemy = !this.isEnemy;
                                  } else {
                                      this.enemyCurrentHP = this.enemyCurrentHP - this.critDmgHtoE;
                                      this.fakeLogs.push(`${this.enemyName} vous a infligé ${this.dmgEtoH} points de dégats, vous avez infligé ${this.critDmgHtoE} points de dégats critique à ${this.enemyName}`)
                                  }
                                } else {
                                  this.init.currentHP = 0;
                                  this.willUpgrade = !this.willUpgrade
                                  this.heroMort = !this.heroMort;
                                  this.fakeLogs.push(`Vous succombez aux ${this.dmgEtoH} points de dégats de ${this.enemyName}.`)
                                }
                  }

            } else {

                          if (enemyCritChance < this.enemyInt) {
                            console.log("enemycrit")
                                if (this.init.currentHP > this.critDmgEtoH) {
                                  this.init.currentHP = this.init.currentHP - this.critDmgEtoH;

                                      if (this.dmgHtoE >= this.enemyCurrentHP) {
                                      this.fakeLogs.push(`${this.enemyName} vous a infligé ${this.critDmgEtoH} points de dégats critique, vous avez infligé ${this.dmgHtoE} points de dégats à ${this.enemyName}`)
                                      this.randomLootVictory();
                                      this.isEnemy = !this.isEnemy;
                                  } else {
                                      this.enemyCurrentHP = this.enemyCurrentHP - this.dmgHtoE;
                                      this.fakeLogs.push(`${this.enemyName} vous a infligé ${this.critDmgEtoH} points de dégats critique, vous avez infligé ${this.dmgHtoE} points de dégats à ${this.enemyName}`)
                                  }
                                } else {
                                  this.init.currentHP = 0;
                                  this.willUpgrade = !this.willUpgrade
                                  this.heroMort = !this.heroMort;
                                  this.fakeLogs.push(`Vous succombez aux ${this.critDmgEtoH} points de dégats critique de ${this.enemyName}.`)
                                }
                        } else {

                                if (this.init.currentHP > this.dmgEtoH) {
                                  this.init.currentHP = this.init.currentHP - this.dmgEtoH;
                                      if (this.dmgHtoE >= this.enemyCurrentHP) {
                                      this.fakeLogs.push(`${this.enemyName} vous a infligé ${this.dmgEtoH} points de dégats, vous avez infligé ${this.dmgHtoE} points de dégats à ${this.enemyName}`)
                                      this.randomLootVictory();
                                      this.isEnemy = !this.isEnemy;
                                  } else {
                                      this.enemyCurrentHP = this.enemyCurrentHP - this.dmgHtoE;
                                      this.fakeLogs.push(`${this.enemyName} vous a infligé ${this.dmgEtoH} points de dégats, vous avez infligé ${this.dmgHtoE} points de dégats à ${this.enemyName}`)
                                  }
                                } else {
                                  this.init.currentHP = 0;
                                  this.willUpgrade = !this.willUpgrade
                                  this.heroMort = !this.heroMort;
                                  this.fakeLogs.push(`Vous succombez aux ${this.dmgEtoH} points de dégats critique de ${this.enemyName}.`)
                                }
    }}}
  if (this.init.currentHP >= 50) {
    this.test = "Green"
  } else if (this.init.currentHP >= 19 ) {
    this.test = "Orange"
  } else {
    this.test = "Red"
  }
  if (this.init.Gold <= 100) {
    this.goldColor = this.goldColor
    this.goldScale = '1em'
  } else if (this.init.Gold <= 1000) {
    this.goldColor = "#dbd143"
    this.goldScale = '1.3em'
  }
  };
  public goldColor = 'yellow'
  public goldScale = '1em'


      critDoubleSensHeroFaster() {
        this.enemyCurrentHP = this.enemyCurrentHP - this.critDmgHtoE;
          ///
          if (this.init.currentHP > this.critDmgEtoH) {
            this.init.currentHP = this.init.currentHP - this.critDmgEtoH;
            this.fakeLogs.push(`Vous avez infligé ${this.critDmgHtoE} points de dégats critique à ${this.enemyName},
                               ${this.enemyName} vous a infligé ${this.critDmgEtoH} points de dégats critique, `)
        } else {
            this.init.currentHP = 0;
            this.willUpgrade = !this.willUpgrade
            this.heroMort = !this.heroMort;
            this.fakeLogs.push(`Vous avez infligé ${this.critDmgHtoE} points de dégats critique à ${this.enemyName}, avant de succomber aux ${this.critDmgEtoH} points de dégats critique de ${this.enemyName}.`)

          }
        }

     /* critDoubleSensEnemyFaster() {

          ///
          if (this.init.currentHp > this.critDmgEtoH) {
            this.init.currentHp = this.init.currentHp - this.critDmgEtoH;
            this.enemyCurrentHP = this.enemyCurrentHP - this.critDmgHtoE;
            this.fakeLogs.push(`${this.enemyName} vous a infligé ${this.critDmgEtoH} points de dégats critique, vous avez infligé ${this.critDmgHtoE} points de dégats critique à ${this.enemyName}`)
        } else {
            this.init.currentHp = 0;
            this.willUpgrade = !this.willUpgrade
            this.heroMort = !this.heroMort;
            this.fakeLogs.push(`Vous succombez aux ${this.critDmgEtoH} points de dégats critique de ${this.enemyName}.`)

          }
      }*/

      critHeroandHeroFaster() {
        this.enemyCurrentHP = this.enemyCurrentHP - this.critDmgHtoE;
        ///
         if (this.init.currentHP > this.dmgEtoH) {
          this.init.currentHP = this.init.currentHP - this.dmgEtoH;
          this.fakeLogs.push(`Vous avez infligé ${this.critDmgHtoE} points de dégats critique à ${this.enemyName},
                             ${this.enemyName} vous a infligé ${this.dmgEtoH} points de dégats.`)
      } else {
          this.init.currentHP = 0;
          this.willUpgrade = !this.willUpgrade
          this.heroMort = !this.heroMort;
          this.fakeLogs.push(`Vous avez infligé ${this.critDmgHtoE} points de dégats critique à ${this.enemyName}, avant de succomber aux ${this.dmgEtoH} points de dégats de ${this.enemyName}.`)

        }
        ///
      }

      critEnemyandHeroFaster() {
        this.enemyCurrentHP = this.enemyCurrentHP - this.dmgHtoE;
          ///
          if (this.init.currentHP > this.critDmgEtoH) {
            this.init.currentHP = this.init.currentHP - this.critDmgEtoH;
            this.fakeLogs.push(`Vous avez infligé ${this.dmgHtoE} points de dégats à ${this.enemyName},
                               ${this.enemyName} vous a infligé ${this.critDmgEtoH} points de dégats critique, `)
        } else {
            this.init.currentHP = 0;
            this.willUpgrade = !this.willUpgrade
            this.heroMort = !this.heroMort;
            this.fakeLogs.push(`Vous avez infligé ${this.dmgHtoE} points de dégats à ${this.enemyName}, avant de succomber aux ${this.critDmgEtoH} points de dégats critique de ${this.enemyName}.`)

          }
          ///
      }

      nonCritDoubleSensHeroFaster() {
        this.enemyCurrentHP = this.enemyCurrentHP - this.dmgHtoE;
          ///
          if (this.init.currentHP > this.dmgEtoH) {
            this.init.currentHP = this.init.currentHP - this.dmgEtoH;
            this.fakeLogs.push(`Vous avez infligé ${this.dmgHtoE} points de dégats à ${this.enemyName},
                               ${this.enemyName} vous a infligé ${this.dmgEtoH} points de dégats.`)
        } else {
            this.init.currentHP = 0;
            this.willUpgrade = !this.willUpgrade
            this.heroMort = !this.heroMort;
            this.fakeLogs.push(`Vous avez infligé ${this.dmgHtoE} points de dégats à ${this.enemyName}, avant de succomber aux ${this.dmgEtoH} points de dégats de ${this.enemyName}.`)

          }
          ///
      }





public coupFatal = false;
  deathCounter(){
    const dmgEtoH = this.enemyAtk - this.heros[0].Def;
    const riposte = Math.random()*100
    if (riposte < 35) {
      if(this.enemyAtk < this.heros[0].Def) {
        this.fakeLogs.push("Le monstre a riposté dans un ultime effort, votre Def vous a permis d'encaisser l'attaque ")
      } else {

        ///
        if (this.init.currentHP > dmgEtoH) {
          this.init.currentHP = this.init.currentHP - dmgEtoH;
          this.fakeLogs.push(`Le monstre a riposté dans un ultime effort, vous perdez ${this.enemyAtk} HP ,`)
      } else {
          this.init.currentHP = 0;
          this.willUpgrade = !this.willUpgrade
          this.heroMort = !this.heroMort;
          this.fakeLogs.push(`Le monstre a riposté dans un ultime effort et vous a infligé un coup fatal`)
          this.coupFatal = !this.coupFatal
        }
        ///
        this.ngOnInit();}
      } else {
        this.fakeLogs.push('')
      }
  }

  randomLootVictory() {
    const goldDrop = Math.floor(Math.random()*20);
    this.lootChance = Math.random()*100;
    if (this.enemyName === "Mu the Force Slime") {
      this.init.Force++
      this.init.Gold+=5;
      this.fakeLogs.push(`Vous avez vaincu un monstre spécial, vous gagnez +1 Force et 5 Gold bonus`)
    } else if (this.enemyName === "Mu the Def Slime") {
      this.init.Gold+=5;
      this.init.Def++
      this.fakeLogs.push(`Vous avez vaincu un monstre spécial, vous gagnez +1 Def et 5 Gold bonus`)
    } else if (this.enemyName === "Mu the Int Slime") {
      this.init.Gold+=5;
      this.init.Intel++
      this.fakeLogs.push(`Vous avez vaincu un monstre spécial, vous gagnez +1 Intel et 5 Gold bonus`)
    } else if (this.enemyName === "Mu the Speed Slime") {
      this.init.Gold+=5;
      this.init.Speed++
      this.fakeLogs.push(`Vous avez vaincu un monstre spécial, vous gagnez +1 Speed et 5 Gold bonus`)
    } else if (this.enemyName === "Mu the Metallic Slime") {
      this.init.Gold+=15;
      this.init.HP +=7
      this.init.AvailPoints++
      this.fakeLogs.push(`Vous avez vaincu un monstre spécial rare, vous gagnez +7 HP max, 15 Gold bonus et un point de caractéristique supplémentaire.`)
    } else if (this.enemyName === "Dragon Ancestral") {
      this.init.HP +=15;
      this.init.Force+=3;
      this.init.Def+=3;
      this.init.Intel+=3;
      this.init.Speed+=3;
      this.init.AvailPoints+=10;
      this.init.Gold+=1000;
      this.fakeLogs.push(`Vous avez vaincu le dragon, vos HP max augmentent de 15, vous gagnez +3 Force/Def/Intel/Speed , 10 points de carac supplémentaires et 1000 Gold bonus`)
    }
    if (this.lootChance < 60) {
      this.fakeLogs.push(`Félicitations, vous avez vaincu le monstre, vous remportez 1 point de caractéristiques supplémentaire et ${goldDrop} Gold`)
      this.init.AvailPoints = this.init.AvailPoints + 1;
      this.init.Gold += goldDrop;
      this.init.killCount ++
      this.ngOnInit();

    } else {
      this.fakeLogs.push(`Félicitations, vous avez vaincu le monstre et remportez ${goldDrop} Gold`)
      this.init.killCount ++
      this.init.Gold += goldDrop;
      this.ngOnInit();
    }
  }


  soinPotion(){
    this.fakeLogs.push(`Vous utilisez une potion de soin et récupérez ${this.init.HP - this.init.currentHP} HP. Vous utilisez 20 Gold (reste ${this.init.Gold})`)
    this.init.currentHP += 50;
    if (this.init.currentHP > this.init.HP) {
      this.init.currentHP = this.init.HP
    }
    this.init.Gold -=20;
    this.ngOnInit();
  }

  public costBoostPotion=50;
  forcePotion(){
    const potionRandom = Math.random()*3
    if (potionRandom < 0.7 ) {
      this.fakeLogs.push(`vous utilisez une potion de force de très bonne qualité, vous obtenez 2 point de Force supplémentaire (${this.init.Force} -> ${this.init.Force +2}), vous dépensez ${this.costBoostPotion} Golds `)
      this.init.Force += 2
      this.init.Gold -= this.costBoostPotion
    } else if (potionRandom < 2.7) {
      this.fakeLogs.push(`vous utilisez une potion de force, vous obtenez 1 point de Force supplémentaire (${this.init.Force} -> ${this.init.Force +1}), vous dépensez ${this.costBoostPotion} Golds `)
      this.init.Force ++
      this.init.Gold -= this.costBoostPotion
    } else {
      this.fakeLogs.push(`vous utilisez une potion de force de mauvaise qualité, vous n'obtenez pas de point de Force supplémentaire (${this.init.Force} -> ${this.init.Force}), vous dépensez ${this.costBoostPotion} Golds `)
      this.init.Gold -= this.costBoostPotion
    }
    this.ngOnInit();
  }

  intelPotion(){
    const potionRandom = Math.random()*3
    if (potionRandom < 0.7 ) {
      this.fakeLogs.push(`vous utilisez une potion de Intel de très bonne qualité, vous obtenez 2 point de Intel supplémentaire (${this.init.Intel} -> ${this.init.Intel +2}), vous dépensez ${this.costBoostPotion} Golds `)
      this.init.Intel += 2
      this.init.Gold -= this.costBoostPotion
    } else if (potionRandom < 2.7) {
      this.fakeLogs.push(`vous utilisez une potion de Intel, vous obtenez 1 point de Intel supplémentaire (${this.init.Intel} -> ${this.init.Intel +1}), vous dépensez ${this.costBoostPotion} Golds `)
      this.init.Intel ++
      this.init.Gold -= this.costBoostPotion
    } else {
      this.fakeLogs.push(`vous utilisez une potion de Intel de mauvaise qualité, vous n'obtenez pas de point de Intel supplémentaire (${this.init.Intel} -> ${this.init.Intel}), vous dépensez ${this.costBoostPotion} Golds `)
      this.init.Gold -= this.costBoostPotion
    }
    this.ngOnInit();
  }

  defPotion(){
    const potionRandom = Math.random()*3
    if (potionRandom < 0.7 ) {
      this.fakeLogs.push(`vous utilisez une potion de Def de très bonne qualité, vous obtenez 2 point de Def supplémentaire (${this.init.Def} -> ${this.init.Def +2}), vous dépensez ${this.costBoostPotion} Golds `)
      this.init.Def += 2
      this.init.Gold -= this.costBoostPotion
    } else if (potionRandom < 2.7) {
      this.fakeLogs.push(`vous utilisez une potion de Def, vous obtenez 1 point de Def supplémentaire (${this.init.Def} -> ${this.init.Def +1}), vous dépensez ${this.costBoostPotion} Golds `)
      this.init.Def ++
      this.init.Gold -= this.costBoostPotion
    } else {
      this.fakeLogs.push(`vous utilisez une potion de Def de mauvaise qualité, vous n'obtenez pas de point de Def supplémentaire (${this.init.Def} -> ${this.init.Def}), vous dépensez ${this.costBoostPotion} Golds `)
      this.init.Gold -= this.costBoostPotion
    }
    this.ngOnInit();
  }

  speedPotion(){
    const potionRandom = Math.random()*3
    if (potionRandom < 0.7 ) {
      this.fakeLogs.push(`vous utilisez une potion de Speed de très bonne qualité, vous obtenez 2 point de Speed supplémentaire (${this.init.Speed} -> ${this.init.Speed +2}), vous dépensez ${this.costBoostPotion} Golds `)
      this.init.Speed += 2
      this.init.Gold -= this.costBoostPotion
    } else if (potionRandom < 2.7) {
      this.fakeLogs.push(`vous utilisez une potion de Speed, vous obtenez 1 point de Speed supplémentaire (${this.init.Speed} -> ${this.init.Speed +1}), vous dépensez ${this.costBoostPotion} Golds `)
      this.init.Speed ++
      this.init.Gold -= this.costBoostPotion
    } else {
      this.fakeLogs.push(`vous utilisez une potion de Speed de mauvaise qualité, vous n'obtenez pas de point de Speed supplémentaire (${this.init.Speed} -> ${this.init.Speed}), vous dépensez ${this.costBoostPotion} Golds `)
      this.init.Gold -= this.costBoostPotion
    }
    this.ngOnInit();
  }

  statsReset(){
    this.init.HP = 50;
    this.init.Force = 7;
    this.init.Def = 5;
    this.init.Intel = 7;
    this.init.Speed = 5;
    this.init.AvailPoints = 3;
    this.init.Gold = 5;
    if (this.init.killCount > this.init.highscore) {
      this.init.highscore = this.init.killCount;
      this.init.champion = this.init.name
    }

    this.init.killCount = 0;

    this.init.currentHP = this.init.HP;
    this.heros[0].Force = this.init.Force;
    this.heros[0].Def = this.init.Def;
    this.heros[0].Intel = this.init.Intel;
    this.heros[0].Speed = this.init.Speed;
    this.heros[0].Gold = this.init.Gold;

    this.ngOnInit();
  }

  public onSubmit():void{

    this.submited.emit(this.form.value);
    this.willUpgrade = !this.willUpgrade
  }
}



