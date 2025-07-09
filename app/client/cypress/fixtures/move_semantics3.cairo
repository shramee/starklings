fn main() {
    let arr0 = array![];

    let mut arr1 = fill_arr(arr0);

    println!("{:?}", arr1.span());

    arr1.append(88);

    println!("{:?}", arr1.span());
}

fn fill_arr(mut arr: Array<felt252>) -> Array<felt252> {
    arr.append(22);
    arr.append(44);
    arr.append(66);

    arr
}
