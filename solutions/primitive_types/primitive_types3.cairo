// Destructure the `cat` tuple to call print on each member.



fn main() {
    let cat = ('Furry McFurson', 3);
    let (name, age) = cat;
    println!("name is {}", name);
    println!("age is {}", age);
}
