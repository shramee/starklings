#[derive(Destruct)]
struct Team {
  level: Felt252Dict<usize>,
  players_count: usize 
}

#[generate_trait]
impl TeamImpl of TeamTrait {
    fn new() -> Team {
        Team { level: Default::default(), players_count: 0 }
    }

    fn get_level(ref self: Team, name: felt252) -> usize {
        self.level.get(name)
    }

    fn add_player(ref self: Team, name: felt252, level: usize) -> () {
        self.level.insert(name, level);
        self.players_count += 1;
    }

    fn level_up(ref self: Team, name: felt252) {
        let level = self.level.get(name) + 1;
        self.level.insert(name, level)
    }

    fn players_count(self: @Team) -> usize {
        *self.players_count
    }
}



#[test]
#[available_gas(200000)]
fn test_add_player() {

    let mut team = TeamTrait::new();
    team.add_player('bob', 10);
    team.add_player('alice', 20);

    assert(team.players_count == 2, 'Wrong number of player');
    assert(team.get_level('bob') == 10, 'Wrong level');
    assert(team.get_level('alice') == 20, 'Wrong level');
}

#[test]
#[available_gas(200000)]
fn test_level_up() {

    let mut team = TeamTrait::new();
    team.add_player('bobby',10);
    team.level_up('bobby');

    assert(team.level.get('bobby') == 11, 'Wrong level');
}

