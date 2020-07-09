import { Injectable } from '@angular/core';
import { Store, Select } from "@ngxs/store";
import { NewPlayer, EditPlayer } from "../actions/player.actions";
import { NewBox, RemoveBox, EditBox } from "../actions/box.actions";


@Injectable({
    providedIn: 'root'
})
export class GameService {

    columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    rows = [1, 2, 3, 4, 5, 6];

    constructor(private store: Store) { }

    createPlayer() {
        this.store.dispatch([new NewPlayer({ id: 1, color: "#FF0000", name: "Joueur 1", pions: 21 }), new NewPlayer({ id: 2, color: "#FFFF00", name: "Joueur 2", pions: 21 })])
    }

    initPlayer(player, count = 21) {
        this.store.dispatch(new EditPlayer(player, count))
    }

    /**
    * @description Création des différentes cases du plateau de jeu
    */
    initGameTab() {
        for (var r of this.rows) {
            for (var [ic, c] of this.columns) {
                this.store.dispatch(new NewBox({
                    idBox: String(ic + r),
                    col: ic,
                    row: r,
                    isEmpty: true,
                    idPlayer: 0,
                }))
            };
        }
    }

}
