import { Component } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) return;

    this.heroService.addHero({ name } as Hero)
      .subscribe(h => {
        this.heroes.push(h)
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h.id != hero.id);

    /** Observable does nothing until it is subscribed. */
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
