fn main() {
    let arr0 = array![];

    let mut _arr1 = fill_arr(arr0);
    let arr0 = _arr1.clone();

    // Do not change the following line!
    println!("{:?}", arr0);
}

fn fill_arr(arr: Array<felt252>) -> Array<felt252> {
    let mut arr = arr;

    arr.append(22);
    arr.append(44);
    arr.append(66);

    arr
}
