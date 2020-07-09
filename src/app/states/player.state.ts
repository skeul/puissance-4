import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Player } from "../models/player.model";
import { NewPlayer, EditPlayer, SetCurrentPlayer } from "../actions/player.actions";
import { Injectable } from '@angular/core';

export class PlayerStateModel {
    players: Player[];
    currentPlayer: Player;
}

@State<PlayerStateModel>({
    name: 'players',
    defaults: {
        players: [],
        currentPlayer: null
    }
})
@Injectable()
export class PlayerState {

    @Selector()
    static getplayers(state: PlayerStateModel) {
        return state.players
    }

    @Selector()
    static getcurrent(state: PlayerStateModel) {
        return state.currentPlayer
    }

    @Action(NewPlayer)
    add({ getState, patchState }: StateContext<PlayerStateModel>, { player }: NewPlayer) {
        const state = getState();
        patchState({
            players: [...state.players, player]
        })
    }

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

    @Action(SetCurrentPlayer)
    setSelectedTodoId({ getState, setState }: StateContext<PlayerStateModel>, { player }: SetCurrentPlayer) {
        const state = getState();
        setState({
            ...state,
            currentPlayer: player
        });
    }

}