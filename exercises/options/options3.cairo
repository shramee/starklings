

// I AM NOT DONE

#[derive(Drop)]
struct Student {
    name: felt252,
    courses: Array<Option<felt252>>,
}


fn display_grades(student: @Student) {
    let mut msg = ArrayTrait::new();
    msg.append(*student.name);
    msg.append('\'s grades:');
    println!("{:?}", msg);

    for course in student.courses.span() {
        // TODO: Modify the following lines so that if there is a grade for the course, it is printed.
        //       Otherwise, print "No grade".
        //
        println!("grade is {}", course.unwrap());
    }
}


#[cfg(test)]
#[test]
fn test_all_defined() {
    let courses = array![
        Option::Some('A'),
        Option::Some('B'),
        Option::Some('C'),
        Option::Some('A'),
    ];
    let mut student = Student { name: 'Alice', courses: courses };
    display_grades(@student);
}


#[cfg(test)]
#[test]
fn test_some_empty() {
    let courses = array![
        Option::Some('A'),
        Option::None,
        Option::Some('B'),
        Option::Some('C'),
        Option::None,
    ];
    let mut student = Student { name: 'Bob', courses: courses };
    display_grades(@student);
}
