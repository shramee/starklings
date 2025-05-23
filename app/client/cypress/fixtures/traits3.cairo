#[derive(Copy, Drop)]
struct Fish {
    noise: felt252,
    distance: u32,
}

#[derive(Copy, Drop)]
struct Dog {
    noise: felt252,
    distance: u32,
}

trait AnimalTrait<T> {
    fn new() -> T;
    fn make_noise(self: T) -> felt252;
    fn get_distance(self: T) -> u32;
}

trait FishTrait {
    fn swim(ref self: Fish) -> ();
}

trait DogTrait {
    fn walk(ref self: Dog) -> ();
}

impl AnimalFishImpl of AnimalTrait<Fish> {
    fn new() -> Fish {
        Fish { noise: 'blub', distance: 0 }
    }
    fn make_noise(self: Fish) -> felt252 {
        self.noise
    }
    fn get_distance(self: Fish) -> u32 {
        self.distance
    }
}

impl AnimalDogImpl of AnimalTrait<Dog> {
    fn new() -> Dog {
        Dog { noise: 'woof', distance: 0 }
    }
    fn make_noise(self: Dog) -> felt252 {
        self.noise
    }
    fn get_distance(self: Dog) -> u32 {
        self.distance
    }
}

// TODO: implement FishTrait for the type Fish
impl FishImpl of FishTrait {
    fn swim(ref self: Fish) {
        self.distance += 1;
    }
}

// TODO: implement DogTrait for the type Dog
impl DogImpl of DogTrait {
    fn walk(ref self: Dog) {
        self.distance += 1;
    }
}

#[test]
fn test_traits3() {
    // Don't modify this test!
    let mut salmon: Fish = AnimalTrait::new();
    salmon.swim();
    assert(salmon.make_noise() == 'blub', 'Wrong noise');
    assert(salmon.get_distance() == 1, 'Wrong distance');

    let mut dog: Dog = AnimalTrait::new();
    dog.walk();
    assert(dog.make_noise() == 'woof', 'Wrong noise');
    assert(dog.get_distance() == 1, 'Wrong distance');
}

