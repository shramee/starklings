fn main() {
    let arr0 = array![];

    let mut arr1 = fill_arr(arr0);

    // This is just a print statement for arrays.
    println!("{:?}", arr1.span());

    //TODO fix the error here without modifying this line.
    arr1.append(88);

    println!("{:?}", arr1);
}

fn fill_arr(arr: Array<felt252>) -> Array<felt252> {
    let mut arr = arr;

    arr.append(22);
    arr.append(44);
    arr.append(66);

    arr
}
