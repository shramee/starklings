// Address all the TODOs to make the tests pass!



#[starknet::interface]
trait IContractA<TContractState> {
    fn set_value(ref self: TContractState, value: u128) -> bool;
    fn get_value(self: @TContractState) -> u128;
}


#[starknet::contract]
mod ContractA {
    use starknet::ContractAddress;
    use super::IContractBDispatcher;
    use super::IContractBDispatcherTrait;
    use starknet::storage::*;

    #[storage]
    struct Storage {
        contract_b: ContractAddress,
        value: u128,
    }

    #[constructor]
    fn constructor(ref self: ContractState, contract_b: ContractAddress) {
        self.contract_b.write(contract_b)
    }

    #[abi(embed_v0)]
    impl ContractAImpl of super::IContractA<ContractState> {
        fn set_value(ref self: ContractState, value: u128) -> bool {
            // TODO: check if contract_b is enabled.
            // If it is, set the value and return true. Otherwise, return false.
            let contract_b = self.contract_b.read();
            let contract_b_dispatcher = IContractBDispatcher { contract_address: contract_b };
            if contract_b_dispatcher.is_enabled() {
                self.value.write(value);
                return true;
            }
            return false;
        }

        fn get_value(self: @ContractState) -> u128 {
            self.value.read()
        }
    }
}

#[starknet::interface]
trait IContractB<TContractState> {
    fn enable(ref self: TContractState);
    fn disable(ref self: TContractState);
    fn is_enabled(self: @TContractState) -> bool;
}

#[starknet::contract]
mod ContractB {
    use starknet::storage::*;

    #[storage]
    struct Storage {
        enabled: bool
    }

    #[constructor]
    fn constructor(ref self: ContractState) {}

    #[abi(embed_v0)]
    impl ContractBImpl of super::IContractB<ContractState> {
        fn enable(ref self: ContractState) {
            self.enabled.write(true);
        }

        fn disable(ref self: ContractState) {
            self.enabled.write(false);
        }

        fn is_enabled(self: @ContractState) -> bool {
            self.enabled.read()
        }
    }
}

#[cfg(test)]
mod test {
    use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};
    use starknet::ContractAddress;
    use super::{IContractBDispatcher, IContractADispatcher, IContractADispatcherTrait, IContractBDispatcherTrait};


    fn deploy_contract_b() -> IContractBDispatcher {
        let contract = declare("ContractB").unwrap().contract_class();
        let (contract_address, _) = contract.deploy(@array![]).unwrap();
        IContractBDispatcher { contract_address }
    }

    fn deploy_contract_a(contract_b_address: ContractAddress) -> IContractADispatcher {
        let contract = declare("ContractA").unwrap().contract_class();
        let constructor_calldata = array![contract_b_address.into()];
        let (contract_address, _) = contract.deploy(@constructor_calldata).unwrap();
        IContractADispatcher { contract_address }
    }

    #[test]
    fn test_interoperability() {
        // Deploy ContractB
        let contract_b = deploy_contract_b();

        // Deploy ContractA
        let contract_a = deploy_contract_a(contract_b.contract_address);

        // Enable contract_b to make the test pass
        contract_b.enable();

        // Tests
        assert!(contract_a.set_value(300) == true, "Could not set value");
        assert!(contract_a.get_value() == 300, "Value was not set");
        assert!(contract_b.is_enabled() == true, "Contract b is not enabled");
    }
}
