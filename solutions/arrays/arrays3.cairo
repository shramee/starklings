// Make me compile and pass the test!


fn create_array() -> Array<felt252> {
    let mut a = ArrayTrait::new(); // something to change here...
    a.append(0);
    a.append(1);
    a.append(2);
    a.pop_front().unwrap();
    a
}


#[cfg(test)]
#[test]
fn test_arrays3() {
    let mut a = create_array();
    let _ = a.get(2);
}
