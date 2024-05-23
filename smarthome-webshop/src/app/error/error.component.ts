import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  // diese File soll später mal als detailiertere fehler beschreibung benutzt werden mit je einem einzelnen componenten pro Fehler
  // die dann auch klar erkennbar über eine eigene children url erreichbar sein sollen
  constructor() { }

  ngOnInit(): void {
  }

}
