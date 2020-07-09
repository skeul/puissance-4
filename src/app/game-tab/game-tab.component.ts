import { Component, OnInit } from '@angular/core';
import { Store, Select } from "@ngxs/store";
import { Box } from "../models/box.model";
import { BoxState } from "../states/box.state";
import { NewBox, RemoveBox, EditBox } from "../actions/box.actions";
import { Player } from "../models/player.model";
import { PlayerState } from "../states/player.state";
import { EditPlayer, SetCurrentPlayer } from "../actions/player.actions";
import { Observable } from "rxjs";
import { trigger, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogComponent } from '../dialog/dialog.component';
import { GameService } from "../services/game.service";

@Component({
    selector: 'app-game-tab',
    templateUrl: './game-tab.component.html',
    styleUrls: ['./game-tab.component.scss'],
    animations: [
        trigger(
            'inOutAnimation',
            [
                transition(
                    ':enter',
                    [
                        style({ transform: 'translateY(-600%)' }),
                        animate('.8s ease-in',
                            style({ transform: 'translateY(0)' }))
                    ]
                ),

            ]
        )
    ]
})
export class GameTabComponent implements OnInit {

    columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    rows = [1, 2, 3, 4, 5, 6];
    boxes: Box[] = []
    players: Player[] = []
    currentPlayer: Player
    dialog: MatDialogRef<DialogComponent>;

    @Select(BoxState) state$: Observable<any>
    @Select(PlayerState.getplayers) playerState$: Observable<any>
    @Select(PlayerState.getcurrent) playerCurrent$: Observable<any>

    constructor(private store: Store, public matDialog: MatDialog, private gameService: GameService) {
        this.state$.subscribe(
            (data) => this.boxes = data.boxes
        );
        this.playerState$.subscribe(
            (data) => this.players = data
        );
        this.playerCurrent$.subscribe(
            (data) => this.currentPlayer = data
        );
    }

    ngOnInit() {
        this.gameService.initGameTab()
        this.store.dispatch(new SetCurrentPlayer(this.players[0]))
    }

    /**
    * @description Changement de joueur 
    */
    setCurrentPlayer() {
        if (this.currentPlayer.id === 1)
            this.store.dispatch(new SetCurrentPlayer(this.players[1]))
        else
            this.store.dispatch(new SetCurrentPlayer(this.players[0]))
    }

    /**
    * @param box 
    * @description Lorsque le joueur joue son pion
    */
    play(box) {
        this.store.dispatch(new EditBox(box.col, this.currentPlayer.id))
        this.store.dispatch(new EditPlayer(this.currentPlayer, this.currentPlayer.pions - 1))
        this.checkForWin();
        this.setCurrentPlayer()
    }

    /**
    * @param title
    * @param message 
    * @description Ouverture de la boite de dialogue
    */
    openDialog(title, message) {
        // Init le la boite de dialog
        this.dialog = this.matDialog.open(DialogComponent, {
            disableClose: true
        });
        this.dialog.componentInstance.dialogTitle = title
        this.dialog.componentInstance.dialogMessage = message

        this.dialog.afterClosed().subscribe(result => {
            this.store.dispatch(new RemoveBox())
            this.gameService.initGameTab()
            this.players.forEach((p) =>
                this.gameService.initPlayer(p)
            )
        });
    }

    /**
    * @description Vérification  de victoire ou d'égalité
    */
    checkForWin() {
        // on parcours les cases pour vérifier si il y a un gagnant
        for (let index = this.boxes.length - 1; index > 0; index--) {
            // vérification horizontale
            if (this.boxes[index].idPlayer !== 0 && this.boxes[index - 1] !== undefined && this.boxes[index - 2] !== undefined && this.boxes[index - 3] !== undefined) {
                if (this.boxes[index].idPlayer !== 0
                    && (this.boxes[index].idPlayer === this.boxes[index - 1].idPlayer && this.boxes[index].row === this.boxes[index - 1].row)
                    && (this.boxes[index].idPlayer === this.boxes[index - 2].idPlayer && this.boxes[index - 1].row === this.boxes[index - 2].row)
                    && (this.boxes[index].idPlayer === this.boxes[index - 3].idPlayer && this.boxes[index - 2].row === this.boxes[index - 3].row)) {

                    setTimeout(() => this.openDialog('Victoire', 'Le joueur ' + this.boxes[index].idPlayer + ' à gagné!!!'), 800)
                    break;
                }
            }

            // vérification verticale
            if (this.boxes[index].idPlayer !== 0 && this.boxes[index - 7] !== undefined && this.boxes[index - 14] !== undefined && this.boxes[index - 21] !== undefined) {
                if (this.boxes[index].idPlayer !== 0
                    && (this.boxes[index].idPlayer === this.boxes[index - 7].idPlayer)
                    && (this.boxes[index].idPlayer === this.boxes[index - 14].idPlayer)
                    && (this.boxes[index].idPlayer === this.boxes[index - 21].idPlayer)) {

                    this.openDialog('Victoire', 'Le joueur ' + this.boxes[index].idPlayer + ' à gagné!!!')
                    break;
                }
            }

            // vérification diagonale vers la droite
            if (this.boxes[index].idPlayer !== 0 && this.boxes[index - 6] !== undefined && this.boxes[index - 12] !== undefined && this.boxes[index - 18] !== undefined) {
                if (this.boxes[index].idPlayer !== 0
                    && (this.boxes[index].idPlayer === this.boxes[index - 6].idPlayer && this.boxes[index].row !== this.boxes[index - 6].row)
                    && (this.boxes[index].idPlayer === this.boxes[index - 12].idPlayer && this.boxes[index - 6].row !== this.boxes[index - 12].row)
                    && (this.boxes[index].idPlayer === this.boxes[index - 18].idPlayer && this.boxes[index - 12].row !== this.boxes[index - 18].row)) {

                    this.openDialog('Victoire', 'Le joueur ' + this.boxes[index].idPlayer + ' à gagné!!!')
                    break;
                }
            }
            // vérification diagonale vers la gauche
            if (this.boxes[index].idPlayer !== 0 && this.boxes[index - 8] !== undefined && this.boxes[index - 16] !== undefined && this.boxes[index - 24] !== undefined) {
                if (this.boxes[index].idPlayer !== 0
                    && (this.boxes[index].idPlayer === this.boxes[index - 8].idPlayer && (Number(this.boxes[index].row) - 1) === Number(this.boxes[index - 8].row))
                    && (this.boxes[index].idPlayer === this.boxes[index - 16].idPlayer && (Number(this.boxes[index - 8].row) - 1) === Number(this.boxes[index - 16].row))
                    && (this.boxes[index].idPlayer === this.boxes[index - 24].idPlayer && (Number(this.boxes[index - 16].row) - 1) === Number(this.boxes[index - 24].row))) {

                    this.openDialog('Victoire', 'Le joueur ' + this.boxes[index].idPlayer + ' à gagné!!!')
                    break;
                }
            }

            // Vérification en cas d'égalité
            if (this.players[0].pions === 0 && this.players[1].pions === 0) {
                this.openDialog('Egalité !!!', 'Vous n\'avez plus de pions et personne n\'a gagné!!!')
                break;
            }
        }
    }
}
