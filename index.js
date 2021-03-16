const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
let squares = []
let score = 0

// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

// create the board
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
    squares.push(square)

    if (layout[i] === 0) {
        squares[i].classList.add('pac-dot')
    } else if (layout[i] === 1) {
        squares[i].classList.add('wall')
    } else if (layout[i] === 2) {
        squares[i].classList.add('ghost-lair')
    } else if (layout[i] === 3) {
        squares[i].classList.add('power-pellet')
    }    
  }
}
createBoard()

// pacmans starting position
let pacmanCurrentPos = 490
squares[pacmanCurrentPos].classList.add('pacman')

// move pacman: ghost lair is not allowed, move through walls not allowed.
// left-37, up-38, right-39, down-40.
function control(e) {
    squares[pacmanCurrentPos].classList.remove('pacman')
    switch(e.keyCode) {
        case 40:
            if (
                !squares[pacmanCurrentPos + width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentPos + width].classList.contains('wall') &&
                pacmanCurrentPos + width < width * width
            )
            pacmanCurrentPos += width
        break
        case 38:
            if (
                !squares[pacmanCurrentPos - width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentPos - width].classList.contains('wall') &&
                pacmanCurrentPos - width >= 0
            )
            pacmanCurrentPos -= width
        break    
        case 37:
            if (
                !squares[pacmanCurrentPos - 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentPos - 1].classList.contains('wall') &&
                pacmanCurrentPos % width !== 0
            )
            pacmanCurrentPos -= 1
            if (pacmanCurrentPos === 364) {
                pacmanCurrentPos = 391
            }
        break
        case 39:
            if (
                !squares[pacmanCurrentPos + 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentPos + 1].classList.contains('wall') &&
                pacmanCurrentPos % width < width - 1
            )
            pacmanCurrentPos += 1
            if (pacmanCurrentPos === 391) {
                pacmanCurrentPos = 364
            }
        break
    }
    squares[pacmanCurrentPos].classList.add('pacman')
    // check if any of theses functions are true
    pacDotEaten()
    powerPelletEaten()
    checkForWin()
    checkForGameOver()
}
document.addEventListener('keyup', control)

// when pacman moves into same square as a pacdot
function pacDotEaten() {
    if (squares[pacmanCurrentPos].classList.contains('pac-dot')) {
        squares[pacmanCurrentPos].classList.remove('pac-dot')
        score++
        scoreDisplay.innerHTML = score
    }
}


// when pacman moves into same square as a power pellet
function powerPelletEaten() {
    if (squares[pacmanCurrentPos].classList.contains('power-pellet')) {
        squares[pacmanCurrentPos].classList.remove('power-pellet')
        score +=10
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 10000)
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentPos = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

ghosts.forEach(ghost => {
    squares[ghost.currentPos].classList.add(ghost.className)
    squares[ghost.currentPos].classList.add('ghost')
})

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    
    ghost.timerId = setInterval(function() {
        if (!squares[ghost.currentPos + direction].classList.contains('wall') &&
            !squares[ghost.currentPos + direction].classList.contains('ghost')
        ) {
            squares[ghost.currentPos].classList.remove(ghost.className)
            squares[ghost.currentPos].classList.remove('ghost', 'scared-ghost')
            ghost.currentPos += direction

            squares[ghost.currentPos].classList.add(ghost.className)
            squares[ghost.currentPos].classList.add('ghost')
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        if (ghost.isScared) {
            squares[ghost.currentPos].classList.add('scared-ghost')
        }

        if (ghost.isScared && squares[ghost.currentPos].classList.contains('pacman')) {
            squares[ghost.currentPos].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentPos = ghost.startIndex
        score += 100
        squares[ghost.currentPos].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver()
    }, ghost.speed )
}

function checkForGameOver() {
    if (
        squares[pacmanCurrentPos].classList.contains('ghost') &&
        !squares[pacmanCurrentPos].classList.contains('scared-ghost')
    ) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
        scoreDisplay.innerHTML = 'You lose'
    }
}

function checkForWin() {
    if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
        scoreDisplay.innerHTML = 'You Win!'
    }
}

