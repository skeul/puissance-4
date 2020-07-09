import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Box } from "../models/box.model";
import { NewBox, EditBox, RemoveBox } from "../actions/box.actions";
import { Injectable } from '@angular/core';

export class BoxStateModel {
    boxes: Box[];
}

@State<BoxStateModel>({
    name: 'boxes',
    defaults: {
        boxes: []
    }
})
@Injectable()
export class BoxState {

    @Selector()
    static getBoxes(state: BoxStateModel) {
        return state.boxes
    }

    @Selector()
    static getEmptyBoxes(state: BoxStateModel) {
        return state.boxes.filter(item => item.isEmpty === true)
    }

    @Action(NewBox)
    add({ getState, patchState }: StateContext<BoxStateModel>, { payload }: NewBox) {
        const state = getState();
        patchState({
            boxes: [...state.boxes, payload]
        })
    }

    @Action(EditBox)
    edit({ getState, setState }: StateContext<BoxStateModel>, { col, idPlayer }: EditBox) {
        const state = getState();
        const boxesList = [...state.boxes];
        const boxesColumn = state.boxes.filter(item => item.col === col && item.idPlayer === 0)
        if (boxesColumn.length) {
            const boxIndex = boxesList.findIndex(b => b.idBox === boxesColumn[boxesColumn.length - 1].idBox);
            boxesList[boxIndex].idPlayer = idPlayer
            boxesList[boxIndex].isEmpty = false
            setState({
                ...state,
                boxes: boxesList
            })
        }
    }

    @Action(RemoveBox)
    remove({ getState, setState }: StateContext<BoxStateModel>, { }: RemoveBox) {
        const state = getState();
        setState({
            ...state,
            boxes: []
        })
    }

}