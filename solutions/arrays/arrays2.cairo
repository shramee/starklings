// Your task is to make the test pass without modifying the `create_array` function.
// Make me compile and pass the test!



// Don't modify this function
fn create_array() -> Array<felt252> {
    let mut a = ArrayTrait::new();
    a.append(42);
    a
}

fn remove_element_from_array(ref a: Array<felt252>) {
    let _ = a.pop_front();
}

#[cfg(test)]
#[test]
fn test_arrays2() {
    let mut a = create_array();
    assert(a.len() == 1, 'Array should have one element');
    assert(*a.at(0) == 42, 'First element should be 42');
}

#[cfg(test)]
#[test]
fn test_arrays2_empty() {
    let mut a = create_array();
    remove_element_from_array(ref a);
    assert(a.len() == 0, 'Array length is not 0');
}
