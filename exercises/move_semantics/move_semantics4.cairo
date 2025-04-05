// Refactor this code so that instead of passing `arr0` into the `fill_arr` function,
// the Array gets created in the function itself and passed back to the main
// function.


use debug::PrintTrait;

fn main() {
    let arr0 = ArrayTrait::new();

    let mut arr1 = fill_arr(arr0);

    arr1.clone().print();

    arr1.append(88);

    arr1.clone().print();
}

// `fill_arr()` should no longer take `arr: Array<felt252>` as argument
fn fill_arr(mut arr: Array<felt252>) -> Array<felt252> {
    arr.append(22);
    arr.append(44);
    arr.append(66);

    arr
}
