
use std::collections::btree_map::{VacantEntry, Values};

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info:: {next_account_info, AccountInfo}, entrypoint::{ProgramResult}, entrypoint, msg, pubkey:: Pubkey
};

#[derive(BorshDeserialize, BorshSerialize)]
enum InstructionType {
    Increment(u32),
    Decrement(u32)
}

#[derive(BorshDeserialize, BorshSerialize)]
struct Counter {
    count: u32
}

entrypoint!(counter_contract);
pub fn counter_contract(    
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
) -> ProgramResult {

    let acc = next_account_info(&mut accounts.iter())?;

    let instruction_type = InstructionType::try_from_slice(instruction_data)?;

    match instruction_data {
        InstructionType::Increment(value) =>{

        },
        InstructionType::Decrement(value) => {

        }
    }
    Ok(())
}