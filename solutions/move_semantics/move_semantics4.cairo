// Refactor this code so that instead of passing `arr0` into the `fill_arr` function,
// the Array gets created in the function itself and passed back to the main
// function.

fn main() {
    let mut arr1 = fill_arr();

    println!("arr1: {:?}", arr1);

    arr1.append(88);

    println!("arr1: {:?}", arr1);
}

// `fill_arr()` should no longer take `arr: Array<felt252>` as argument
fn fill_arr() -> Array<felt252> {
    let mut arr = ArrayTrait::<felt252>::new();

    arr.append(22);
    arr.append(44);
    arr.append(66);

    arr
}
