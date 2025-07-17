// Make me compile without changing the indicated lines


fn main() {
    let mut arr0 = ArrayTrait::new();

    fill_arr(ref arr0);

    // Do not change the following line!
    print_arr(arr0);
}

fn print_arr(arr: Array<felt252>) {
    println!("arr: {:?}", arr);
}

// Do not change the following line!
fn fill_arr(ref arr: Array<felt252>){
    arr.append(22);
    arr.append(44);
    arr.append(66);
}
