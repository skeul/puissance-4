import { Box } from "../models/box.model";

/**
 * @description Nouvelle case de jeu
 */
export class NewBox {
    static readonly type = '[BOX] New'

    constructor(public payload: Box) { }
}

/**
 * @description Edit d'une case
 */
export class EditBox {
    static readonly type = '[BOX] Edit'
    constructor(public col: string, public idPlayer: number) { }
}

/**
 * @description Suppression des cases 
 */
export class RemoveBox {
    static readonly type = '[BOX] Remove'
    constructor() { }
}