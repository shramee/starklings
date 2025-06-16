// Liz, a friend of Jill, wants to manage inventory for her store on-chain.
// This is a bit challenging for Joe and Jill, Liz prepared an outline
// for how contract should work, can you help Jill and Joe write it?

use starknet::ContractAddress;

#[starknet::interface]
trait ILizInventory<TContractState> {
    fn add_stock(ref self: TContractState, product: felt252, new_stock: u32);
    fn purchase(ref self: TContractState, product: felt252, quantity: u32);
    fn get_stock(self: @TContractState, product: felt252) -> u32;
    fn get_owner(self: @TContractState) -> ContractAddress;
}

#[starknet::contract]
mod LizInventory {
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map, StorageMapReadAccess, StorageMapWriteAccess};

    #[storage]
    struct Storage {
        contract_owner: ContractAddress,
        inventory: Map<felt252, u32>,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.contract_owner.write(owner);
    }


    #[abi(embed_v0)]
    impl LizInventoryImpl of super::ILizInventory<ContractState> {
        fn add_stock(ref self: ContractState, product: felt252, new_stock: u32) {
            // Only owner can call this
            let caller = get_caller_address();
            let owner = self.contract_owner.read();
            assert(caller == owner, 'Only owner can add stock');

            // Add new_stock to existing stock in inventory
            let current_stock = self.inventory.entry(product).read();
            let updated_stock = current_stock + new_stock;
            self.inventory.entry(product).write(updated_stock);
        }

        fn purchase(ref self: ContractState, product: felt252, quantity: u32) {
            // Anybody can call this
            // Subtract quantity from stock in inventory
            let current_stock = self.inventory.entry(product).read();
            assert(current_stock >= quantity, 'Insufficient stock');

            let updated_stock = current_stock - quantity;
            self.inventory.entry(product).write(updated_stock);
        }

        fn get_stock(self: @ContractState, product: felt252) -> u32 {
            // Returns product stock in inventory
            self.inventory.entry(product).read()
        }

        fn get_owner(self: @ContractState) -> ContractAddress {
            self.contract_owner.read()
        }
    }
}

#[cfg(test)]
mod test {
    use starknet::ContractAddress;
    use super::LizInventory;
    use super::ILizInventoryDispatcher;
    use super::ILizInventoryDispatcherTrait;
    use snforge_std::{declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address, stop_cheat_caller_address};

    #[test]
    fn test_owner() {
        let owner: ContractAddress = 'Elizabeth'.try_into().unwrap();
        let dispatcher = deploy_contract();

        // Check that contract owner is set
        let contract_owner = dispatcher.get_owner();
        assert(contract_owner == owner, 'Elizabeth should be the owner');
    }

    #[test]
    fn test_stock() {
        let dispatcher = deploy_contract();
        let owner = util_felt_addr('Elizabeth');

        // Call contract as owner
        start_cheat_caller_address(dispatcher.contract_address, owner);

        // Add stock
        dispatcher.add_stock('Nano', 10);
        let stock = dispatcher.get_stock('Nano');
        assert(stock == 10, 'stock should be 10');

        dispatcher.add_stock('Nano', 15);
        let stock = dispatcher.get_stock('Nano');
        assert(stock == 25, 'stock should be 25');

        stop_cheat_caller_address(dispatcher.contract_address);
    }

    #[test]
    fn test_stock_purchase() {
        let owner = util_felt_addr('Elizabeth');
        let dispatcher = deploy_contract();
        // Call contract as owner
        start_cheat_caller_address(dispatcher.contract_address, owner);

        // Add stock
        dispatcher.add_stock('Nano', 10);
        let stock = dispatcher.get_stock('Nano');
        assert(stock == 10, 'stock should be 10');

        // Call contract as different address
        stop_cheat_caller_address(dispatcher.contract_address);
        start_cheat_caller_address(dispatcher.contract_address, 0.try_into().unwrap());

        dispatcher.purchase('Nano', 2);
        let stock = dispatcher.get_stock('Nano');
        assert(stock == 8, 'stock should be 8');

        stop_cheat_caller_address(dispatcher.contract_address);
    }

    #[test]
    #[should_panic]
    fn test_set_stock_fail() {
        let dispatcher = deploy_contract();
        // Try to add stock, should panic to pass test!
        dispatcher.add_stock('Nano', 20);
    }

    #[test]
    #[should_panic]
    fn test_purchase_out_of_stock() {
        let dispatcher = deploy_contract();
        // Purchase out of stock
        dispatcher.purchase('Nano', 2);
    }

    fn util_felt_addr(addr_felt: felt252) -> ContractAddress {
        addr_felt.try_into().unwrap()
    }

    fn deploy_contract() -> ILizInventoryDispatcher {
        let owner: felt252 = 'Elizabeth';
        let mut calldata = ArrayTrait::new();
        calldata.append(owner);

        let contract = declare("LizInventory").unwrap().contract_class();
        let (contract_address, _) = contract.deploy(@calldata).unwrap();
        ILizInventoryDispatcher { contract_address }
    }
}
