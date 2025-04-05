// Time to implement some traits!

// Your task is to implement the trait
// `AnimalTrait` for the type `Animal`
//

// Fill in the impl block to make the code work.


#[derive(Copy, Drop)]
struct Animal {
    noise: felt252
}

trait AnimalTrait {
    fn new(noise: felt252) -> Animal;
    fn make_noise(self: Animal) -> felt252;
}

impl AnimalImpl of AnimalTrait { // TODO: implement the trait AnimalTrait for Animal
    fn new(noise: felt252) -> Animal {
        return Animal { noise };
    }

    fn make_noise(self: Animal) -> felt252 {
        return self.noise;
    }
}

#[test]
fn test_traits1() {
    // TODO make the test pass by creating two instances of Animal
    // and calling make_noise on them
    let cat = AnimalImpl::new('meow');
    let cow = AnimalImpl::new('moo');

    assert(cat.make_noise() == 'meow', 'Wrong noise');
    assert(cow.make_noise() == 'moo', 'Wrong noise');
}
