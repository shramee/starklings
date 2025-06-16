// Joe's contract in the last exercise showed that Joe is the owner of the contract.
// He thanks you for helping him out!
// Jill says that contract should allow setting the owner when contract is deployed.
// Help Jill rewrite the contract with a Storage and a constructor.
// There is a `ContractAddress` type which should be used for Wallet addresses.

use starknet::ContractAddress;

#[starknet::contract]
mod JillsContract {
    // This is required to use ContractAddress type
    use starknet::ContractAddress;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};

    #[storage]
    struct Storage {
        contract_owner: ContractAddress,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState, owner: ContractAddress
    ) {
        self.contract_owner.write(owner);
    }

    #[abi(embed_v0)]
    impl IJillsContractImpl of super::IJillsContract<ContractState> {
        fn get_owner(self: @ContractState) -> ContractAddress {
            self.contract_owner.read()
        }
    }
}

#[starknet::interface]
trait IJillsContract<TContractState> {
    fn get_owner(self: @TContractState) -> ContractAddress;
}

#[cfg(test)]
mod test {
    use super::IJillsContractDispatcher;
    use super::IJillsContractDispatcherTrait;
    use super::JillsContract;
    use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};

    #[test]
    fn test_owner_setting() {
        let mut calldata = ArrayTrait::new();
        calldata.append('Jill');

        let contract = declare("JillsContract").unwrap().contract_class();
        let (contract_address, _) = contract.deploy(@calldata).unwrap();
        let dispatcher = IJillsContractDispatcher { contract_address };
        let owner = dispatcher.get_owner();
        assert(owner == 'Jill'.try_into().unwrap(), 'Owner should be Jill');
    }
}
