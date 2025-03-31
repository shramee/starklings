fn maybe_icecream(
    time_of_day: usize
) -> Option<usize> { // We use the 24-hour system here, so 10PM is a value of 22 and 12AM is a value of 0
// The Option output should gracefully handle cases where time_of_day > 23.
// TODO: Complete the function body - remember to return an Option!
    if time_of_day < 22 {
        Option::Some(5)
    }
    else if time_of_day > 23{
        Option::None
    }
    else{
        Option::Some(0)
    }
}


#[test]
fn check_icecream() {
    assert(maybe_icecream(9).unwrap() == 5, 'err_1');
    assert(maybe_icecream(10).unwrap() == 5, 'err_2');
    assert(maybe_icecream(23).unwrap() == 0, 'err_3');
    assert(maybe_icecream(22).unwrap() == 0, 'err_4');
    assert(maybe_icecream(25).is_none(), 'err_5');
}

#[test]
fn raw_value() {
    // TODO: Fix this test. How do you get at the value contained in the Option?
    let icecreams = maybe_icecream(12).unwrap();
    assert(icecreams == 5, 'err_6'); // don't change this line
}