fn sum_u8s(x: u8, y: u8) -> u8 {
    x + y
}

//TODO modify the types of this function to prevent an overflow when summing big values
fn sum_big_numbers(x: u8, y: u8) -> felt252 {
    convert_to_felt(x) + convert_to_felt(y)
}

fn convert_to_felt(x: u8) -> felt252 { //TODO return x as a felt252.
    x.into()
}

fn convert_felt_to_u8(x: felt252) -> u8 { //TODO return x as a u8.
    x.try_into().unwrap()
}

#[test]
fn test_sum_u8s() {
    assert(sum_u8s(1, 2_u8) == 3_u8, 'Something went wrong');
}

#[test]
fn test_sum_big_numbers() {
    //TODO modify this test to use the correct integer types.
    // Don't modify the values, just the types.
    // See how using the _u8 suffix on the numbers lets us specify the type?
    // Try to do the same thing with other integer types.
    assert(sum_big_numbers(255_u8, 255_u8) == 510, 'Something went wrong');
}

#[test]
fn test_convert_to_felt() {
    assert(convert_to_felt(1_u8) == 1, 'Type conversion went wrong');
}

#[test]
fn test_convert_to_u8() {
    assert(convert_felt_to_u8(1) == 1_u8, 'Type conversion went wrong');
}
