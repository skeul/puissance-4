import { Box } from "../models/box.model";

export class NewBox {
    static readonly type = '[BOX] New'

    constructor(public payload: Box) { }
}

export class EditBox {
    static readonly type = '[BOX] Edit'
    constructor(public col: string, public idPlayer: number) { }
}

export class RemoveBox {
    static readonly type = '[BOX] Remove'
    constructor() { }
}