import { Component, OnInit } from '@angular/core';
import { Store, Select } from "@ngxs/store";
import { Player } from "../models/player.model";
import { PlayerState } from "../states/player.state";
import { GameService } from "../services/game.service";
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

  constructor(private store: Store, private gameService: GameService) {
    this.playerState$.subscribe(
      (data) => this.players = data
    );
    this.playerCurrent$.subscribe(
      (current) => this.currentPlayer = current
    )
  }

  ngOnInit() {
    // Initialisation des joueurs 
    this.gameService.createPlayer();
  }



}