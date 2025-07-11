// This code is using Starknet components to make a reusable owner feature.
// This should add OwnableComponent containing functionality which any contracts can include.
// But something is fishy here as this component is not working, can you find the error and make the tests pass?

use starknet::ContractAddress;

#[starknet::interface]
trait IOwnable<TContractState> {
    fn owner(self: @TContractState) -> ContractAddress;
    fn set_owner(ref self: TContractState, new_owner: ContractAddress);
}

#[starknet::component]
pub mod OwnableComponent {
    use starknet::ContractAddress;
    use starknet::storage::*;
    use super::IOwnable;

    #[storage]
    pub struct Storage {
        owner: ContractAddress,
    }

    #[embeddable_as(Ownable)]
    impl OwnableImpl<
        TContractState, +HasComponent<TContractState>
    > of IOwnable<ComponentState<TContractState>> {
        fn owner(self: @ComponentState<TContractState>) -> ContractAddress {
            self.owner.read()
        }
        fn set_owner(ref self: ComponentState<TContractState>, new_owner: ContractAddress) {
            self.owner.write(new_owner);
        }
    }
}

#[starknet::contract]
pub mod OwnableCounter {
    use starknet::ContractAddress;
    use super::OwnableComponent;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::Ownable<ContractState>;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event,
    }
    #[storage]
    pub struct Storage {
        counter: u128,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }
}

#[cfg(test)]
mod tests {
    use crate::IOwnableDispatcherTrait;
    use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};
    use starknet::{contract_address_const, ContractAddress};
    use super::IOwnableDispatcher;

    fn deploy_ownable_counter() -> IOwnableDispatcher {
        let contract = declare("OwnableCounter").unwrap().contract_class();
        let (contract_address, _) = contract.deploy(@array![]).unwrap();
        IOwnableDispatcher { contract_address }
    }

    #[test]
    fn test_contract_read() {
        let dispatcher = deploy_ownable_counter();
        let address_0 = 0;
        dispatcher.set_owner(address_0.try_into().unwrap());
        assert(address_0.try_into().unwrap() == dispatcher.owner(), 'Some fuck up happened');
    }

    #[test]
    #[should_panic]
    fn test_contract_read_fail() {
        let dispatcher = deploy_ownable_counter();
        let address_0 = 0;
        let address_1 = 1;
        dispatcher.set_owner(address_0.try_into().unwrap());
        assert(address_1.try_into().unwrap() == dispatcher.owner(), 'Some fuck up happened');
    }
}
