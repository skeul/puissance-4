import { Player } from "../models/player.model";

/**
 * @description Nouveau joueur
 */
export class NewPlayer {
    static readonly type = '[Player] New'
    constructor(public player: Player) { }
}

/**
 * @description Modification d'un joueur
 */
export class EditPlayer {
    static readonly type = '[Player] Edit'
    constructor(public player: Player) { }
}

/**
 * @description Changement de joueur 
 */
export class SetCurrentPlayer {
    static readonly type = '[Player] SetCurrent'
    constructor(public player: Player) { }
}
