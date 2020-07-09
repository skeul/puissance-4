import { Component, OnInit } from '@angular/core';
import { Store, Select } from "@ngxs/store";
import { Player } from "../models/player.model";
import { PlayerState } from "../states/player.state";
import { NewPlayer } from "../actions/player.actions";
import { Observable } from "rxjs";

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit {

  // Initialisation des variables
  players: Player[] = []
  currentPlayer: Player

  // Initialisation des selecteurs
  @Select(PlayerState.getplayers) playerState$: Observable<any>
  @Select(PlayerState.getcurrent) playerCurrent$: Observable<any>

  constructor(private store: Store) {
    this.playerState$.subscribe(
      (data) => this.players = data
    );
    this.playerCurrent$.subscribe(
      (current) => this.currentPlayer = current
    )
  }

  ngOnInit() {
    // Ajout des joueurs à l'initialisation
    this.store.dispatch([new NewPlayer({ id: 1, color: "#FF0000", name: "Joueur 1", pions: 21 }), new NewPlayer({ id: 2, color: "#FFFF00", name: "Joueur 2", pions: 21 })])
  }



}