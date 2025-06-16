// Joe liked Jill's work very much. He really likes how useful storage can be.
// Now they decided to write a contract to track the number of exercises they
// complete successfully. Jill says they can use the owner code and allow
// only the owner to update the contract, they agree.
// Can you help them write this contract?

use starknet::ContractAddress;

#[starknet::interface]
trait IProgressTracker<TContractState> {
    fn set_progress(ref self: TContractState, user: ContractAddress, new_progress: u16);
    fn get_progress(self: @TContractState, user: ContractAddress) -> u16;
    fn get_contract_owner(self: @TContractState) -> ContractAddress;
}

#[starknet::contract]
mod ProgressTracker {
    use starknet::ContractAddress;
    use starknet::get_caller_address; // Required to use get_caller_address function
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map, StorageMapReadAccess, StorageMapWriteAccess};

    #[storage]
    struct Storage {
        contract_owner: ContractAddress,
        progress: Map<ContractAddress, u16>
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.contract_owner.write(owner);
    }


    #[abi(embed_v0)]
    impl ProgressTrackerImpl of super::IProgressTracker<ContractState> {
        fn set_progress(
            ref self: ContractState, user: ContractAddress, new_progress: u16
        ) {
            // Assert owner is calling
            let caller = get_caller_address();
            let owner = self.contract_owner.read();
            assert(caller == owner, 'Only owner can set progress');

            // Set new_progress for user
            self.progress.write(user, new_progress);
        }

        fn get_progress(self: @ContractState, user: ContractAddress) -> u16 {
            // Get user progress
            self.progress.read(user)
        }

        fn get_contract_owner(self: @ContractState) -> ContractAddress {
            self.contract_owner.read()
        }
    }
}

#[cfg(test)]
mod test {
    use starknet::ContractAddress;
    use super::IProgressTrackerDispatcher;
    use super::IProgressTrackerDispatcherTrait;
    use super::ProgressTracker;
    use snforge_std::{declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address, stop_cheat_caller_address};

    #[test]
    fn test_owner() {
        let owner: ContractAddress = 'Sensei'.try_into().unwrap();
        let dispatcher = deploy_contract();
        assert(owner == dispatcher.get_contract_owner(), 'Mr. Sensei should be the owner');
    }

    #[test]
    fn test_set_progress() {
        let owner = util_felt_addr('Sensei');
        let dispatcher = deploy_contract();

        // Call contract as owner
        start_cheat_caller_address(dispatcher.contract_address, owner);

        // Set progress
        dispatcher.set_progress('Joe'.try_into().unwrap(), 20);
        dispatcher.set_progress('Jill'.try_into().unwrap(), 25);

        let joe_score = dispatcher.get_progress('Joe'.try_into().unwrap());
        assert(joe_score == 20, 'Joe\'s progress should be 20');

        stop_cheat_caller_address(dispatcher.contract_address);
    }

    #[test]
    #[should_panic]
    fn test_set_progress_fail() {
        let dispatcher = deploy_contract();

        let jon_doe = util_felt_addr('JonDoe');
        // Caller not owner
        start_cheat_caller_address(dispatcher.contract_address, jon_doe);

        // Try to set progress, should panic to pass test!
        dispatcher.set_progress('Joe'.try_into().unwrap(), 20);

        stop_cheat_caller_address(dispatcher.contract_address);
    }

    fn util_felt_addr(addr_felt: felt252) -> ContractAddress {
        addr_felt.try_into().unwrap()
    }

    fn deploy_contract() -> IProgressTrackerDispatcher {
        let owner: felt252 = 'Sensei';
        let mut calldata = ArrayTrait::new();
        calldata.append(owner);

        let contract = declare("ProgressTracker").unwrap().contract_class();
        let (contract_address, _) = contract.deploy(@calldata).unwrap();
        IProgressTrackerDispatcher { contract_address }
    }
}
