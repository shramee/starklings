fn main() {
    let arr0 = ArrayTrait::new();

    let mut _arr1 = fill_arr(arr0);
    let arr0 = _arr1.clone();

    // Do not change the following line!
    print(arr0.span());
}

fn fill_arr(arr: Array<felt252>) -> Array<felt252> {
    let mut arr = arr;

    arr.append(22);
    arr.append(44);
    arr.append(66);

    arr
}

fn print(span: Span<felt252>) { 
    let mut i = 0;
    print!("PATH: {{ len: {}, values: [ ", span.len());
    loop {
        if span.len() == i {
            break;
        }
        let value = *(span.at(i));
        if span.len() - 1 != i {
            print!("{}, ", value);
        } else {
            print!("{}", value);
        }
        i += 1;
    };
    println!(" ] }}");
}