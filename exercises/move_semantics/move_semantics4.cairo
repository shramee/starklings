// Refactor this code so that instead of passing `arr0` into the `fill_arr` function,
// the Array gets created in the function itself and passed back to the main
// function.

// I AM NOT DONE

fn main() {
    let arr0: Array<felt252> = array![];

    let mut arr1 = fill_arr(arr0);

    println!("arr1: {:?}", arr1);

    arr1.append(88);

    println!("arr1: {:?}", arr1);
}

// `fill_arr()` should no longer take `arr: Array<felt252>` as argument
fn fill_arr(arr: Array<felt252>) -> Array<felt252> {
    let mut arr = arr;

    arr.append(22);
    arr.append(44);
    arr.append(66);

    arr
}
