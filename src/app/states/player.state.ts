import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Player } from "../models/player.model";
import { NewPlayer, EditPlayer, SetCurrentPlayer } from "../actions/player.actions";
import { Injectable } from '@angular/core';

export class PlayerStateModel {
    players: Player[];
    currentPlayer: Player;
}

// Declaration nom et default
@State<PlayerStateModel>({
    name: 'players',
    defaults: {
        players: [],
        currentPlayer: null
    }
})
@Injectable()
export class PlayerState {

    // Retourne les joueurs
    @Selector()
    static getplayers(state: PlayerStateModel) {
        return state.players
    }

    // Retourne le joueur qui joue
    @Selector()
    static getcurrent(state: PlayerStateModel) {
        return state.currentPlayer
    }

    // Création d'un joueur
    @Action(NewPlayer)
    add({ getState, patchState }: StateContext<PlayerStateModel>, { player }: NewPlayer) {
        const state = getState();
        patchState({
            players: [...state.players, player]
        })
    }

    // Modification d'un joueur
    @Action(EditPlayer)
    edit({ getState, setState }: StateContext<PlayerStateModel>, { player, count }: EditPlayer) {
        const state = getState();
        const playerList = [...state.players]
        const playerIndex = playerList.findIndex(p => p.id === player.id);
        playerList[playerIndex].pions = count
        setState({
            ...state,
            players: playerList
        })
    }

    // Set du joueur qui joue
    @Action(SetCurrentPlayer)
    setSelectedTodoId({ getState, setState }: StateContext<PlayerStateModel>, { player }: SetCurrentPlayer) {
        const state = getState();
        setState({
            ...state,
            currentPlayer: player
        });
    }

}