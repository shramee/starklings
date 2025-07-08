// Make me compile without adding new lines-- just changing existing lines!
// (no lines with multiple semicolons necessary!)

// I AM NOT DONE

fn main() {
    let arr0 = array![];

    let mut arr1 = fill_arr(arr0);

    print(arr1.clone().span());

    arr1.append(88);

    print(arr1.clone().span());
}

fn fill_arr(arr: Array<felt252>) -> Array<felt252> {
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
