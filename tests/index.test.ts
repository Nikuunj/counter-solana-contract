import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { expect, test } from 'bun:test'
import { COUNT_SIZE, CounterAccount, schema } from './type';
import * as borsh from 'borsh'

const dataAccount: Keypair = Keypair.generate();
const adminAccount: Keypair = Keypair.generate();
const connection = new Connection('https://solana-devnet.g.alchemy.com/v2/mxERBjRDJBMyKOE2DqXgILP1vx7iulPl');
const PROGRAM_ID = new PublicKey('5ddm1BtTxBVkrRAapv8YfaWoy2xttzxMPBwT8mWc1bte');

test("Airdrop Admin account", async  () => {
    const tx =  await connection.requestAirdrop(adminAccount.publicKey, LAMPORTS_PER_SOL * 2);
    await connection.confirmTransaction(tx);
    const data = await connection.getAccountInfo(adminAccount.publicKey)
    // admin airdrop complete
    console.log(adminAccount.publicKey.toBase58());
    console.log(data);

    const lamports = await connection.getMinimumBalanceForRentExemption(COUNT_SIZE);

    const ix = SystemProgram.createAccount({
        fromPubkey: adminAccount.publicKey,
        newAccountPubkey: dataAccount.publicKey,
        lamports,
        space: COUNT_SIZE,
        programId: PROGRAM_ID
    })

    const createAccTX = new Transaction();
    createAccTX.add(ix);

    const sign = await connection.sendTransaction(createAccTX, [adminAccount, dataAccount]);

    await connection.confirmTransaction(sign);

    // data acount created
    console.log(dataAccount.publicKey.toBase58());

    const counterAcc =  await connection.getAccountInfo(dataAccount.publicKey);

    if(!counterAcc) {
        throw new Error('Couner acc not exist');
    }

    const counter = borsh.deserialize(schema, counterAcc.data) as CounterAccount;

    console.log(counter.count);    

    expect(counter.count).toBe(0);
})