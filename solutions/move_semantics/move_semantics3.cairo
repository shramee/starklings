// Make me compile without adding new lines-- just changing existing lines!
// (no lines with multiple semicolons necessary!)

fn main() {
    let arr0 = ArrayTrait::new();

    let mut arr1 = fill_arr(arr0);

    println!("arr1: {:?}", arr1);

    arr1.append(88);

    println!("arr1: {:?}", arr1);
}

fn fill_arr(mut arr: Array<felt252>) -> Array<felt252> {
    arr.append(22);
    arr.append(44);
    arr.append(66);

    arr
}
