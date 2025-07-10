fn main() {
    let arr0: Array<felt252> = array![];

    let mut arr1 = fill_arr();

    println!("{:?}", arr1);

    arr1.append(88);

    println!("{:?}", arr1);
}

// `fill_arr()` should no longer take `arr: Array<felt252>` as argument
fn fill_arr() -> Array<felt252> {
    let mut arr = array![];

    arr.append(22);
    arr.append(44);
    arr.append(66);

    arr
}
