



#[cfg(test)]
#[test]
fn test_loop() {
    let mut counter = 0;

    let result = loop {
        if counter == 5 {
            break counter;
        }
        counter += 1;
    };

    assert!(result == 5, "result should be 5");
}
