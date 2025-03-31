use core::fmt::{Display, Formatter, Error};

#[derive(Drop)]
enum Message { // TODO: define a few types of messages as used below
    Quit,
    Echo,
    Move,
    ChangeColor,
}

fn main() {
    println!("{}", Message::Quit);
    println!("{}", Message::Echo);
    println!("{}", Message::Move);
    println!("{}", Message::ChangeColor);
}

impl MessageDisplay of Display<Message> {
    fn fmt(self: @Message, ref f: Formatter) -> Result<(), Error> {
        let str: ByteArray = match self {
            Message::Quit => format!("Quit"),
            Message::Echo => format!("Echo"),
            Message::Move => format!("Move"),
            Message::ChangeColor => format!("ChangeColor")
        };
        f.buffer.append(@str);
        Result::Ok(())
    }
}