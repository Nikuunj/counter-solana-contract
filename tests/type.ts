import * as borsh from 'borsh';
 
export class CounterAccount {
    count: number;

    constructor({count}: { count: number }) {
        this.count = count;
    }
}

export const schema: borsh.Schema = {
    struct: {
        count: 'u32'
    }
}

export const COUNT_SIZE =  borsh.serialize(shema, new CounterAccount({count: 0})).length;