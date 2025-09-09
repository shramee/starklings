// Address all the TODOs to make the tests pass!

#[derive(Copy, Drop)]
struct ColorStruct {
    red: u8,
    green: u8,
    blue: u8,
}


#[cfg(test)]
#[test]
fn classic_c_structs() {
    // TODO: Instantiate a classic color struct!
    // Green color neeeds to have green set to 255 and, red and blue, set to 0
    let green = ColorStruct { red: 0, green: 255, blue: 0 };

    assert(green.red == 0, 0);
    assert(green.green == 255, 0);
    assert(green.blue == 0, 0);
}
