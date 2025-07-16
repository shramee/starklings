// Starkling, Joe, is writing a really simple contract.
// The contract shows that he is the owner of the contract.
// However, his contract is not working. What's he missing?

#[starknet::interface]
trait IJoesContract<TContractState> {
    fn get_owner(self: @TContractState) -> felt252;
}

#[starknet::contract]
mod JoesContract {
    #[storage]
    struct Storage {}

    #[abi(embed_v0)]
    impl IJoesContractImpl of super::IJoesContract<ContractState> {
        fn get_owner(self: @ContractState) -> felt252 {
            'Joe'
        }
    }
}

#[cfg(test)]
mod test {
    use super::JoesContract;
    use super::IJoesContractDispatcher;
    use super::IJoesContractDispatcherTrait;
    use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};

    #[test]
    fn test_contract_view() {
        let dispatcher = deploy_contract();
        assert!('Joe' == dispatcher.get_owner(), "Joe should be the owner.");
    }

    fn deploy_contract() -> IJoesContractDispatcher {
        let contract = declare("JoesContract").unwrap().contract_class();
        let (contract_address, _) = contract.deploy(@array![]).unwrap();
        IJoesContractDispatcher { contract_address }
    }
}
