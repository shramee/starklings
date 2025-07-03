use starknet::ContractAddress;

#[starknet::interface]
trait IOwnable<TContractState> {
    fn owner(self: @TContractState) -> ContractAddress;
    fn set_owner(ref self: TContractState, new_owner: ContractAddress);
}

#[starknet::component]
mod OwnableComponent {
    use starknet::ContractAddress;
    use super::IOwnable;

    #[storage]
    struct Storage {
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
mod OwnableCounter {
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
    struct Storage {
        counter: u128,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }
}

#[cfg(test)]
mod tests {
    use super::OwnableCounter;
    use super::{IOwnableDispatcher, IOwnable, IOwnableDispatcherTrait};
    use starknet::syscalls::deploy_syscall;

    #[test]
    #[available_gas(200_000_000)]
    fn test_contract_read() {
        let dispatcher = deploy_contract();
        let address_0 = 0;
        dispatcher.set_owner(address_0.try_into().unwrap());
        assert(address_0.try_into().unwrap() == dispatcher.owner(), 'Some fuck up happened');
    }
    #[test]
    #[available_gas(200_000_000)]
    #[should_panic]
    fn test_contract_read_fail() {
        let dispatcher = deploy_contract();
        let address_0 = 0;
        let address_1 = 1;
        dispatcher.set_owner(address_0.try_into().unwrap());
        assert(address_1.try_into().unwrap() == dispatcher.owner(), 'Some fuck up happened');
    }
    fn deploy_contract() -> IOwnableDispatcher {
        let mut calldata = ArrayTrait::new();
        let (address0, _) = deploy_syscall(
            OwnableCounter::TEST_CLASS_HASH.try_into().unwrap(), 0, calldata.span(), false
        )
            .unwrap();
        let contract0 = IOwnableDispatcher { contract_address: address0 };
        contract0
    }
}