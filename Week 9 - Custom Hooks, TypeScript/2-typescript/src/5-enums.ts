enum Direction{
    Up,  // 0
    Down, // 1
    Left, // 2
    Right // 3
}

enum DirectionInWords{
    Up = "up", 
    Down = "down",
    Left = "left",
    Right = "right"
}

enum ResponseStatus {
    Success = 200,
    NotFound = 404,
    Error = 500
}

function doSomething(keyPressed: Direction): number {
    if(keyPressed == Direction.Up){
        return 0;
    }
    return -1;
}