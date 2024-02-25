const items = document.querySelectorAll('.item');
    
let selectedItem = null;
let offsetX = 0;
let offsetY = 0;
let attempts = 13;
let timeLeft = 45; // Time in seconds (5 minutes)

items.forEach(item => {
    item.addEventListener('mousedown', startDrag);
});

function startDrag(event) {
    if (attempts > 0) {
        selectedItem = event.target;
        const rect = selectedItem.getBoundingClientRect();
        offsetX = event.clientX - rect.left - rect.width / 1000;
        offsetY = event.clientY - rect.top - rect.height / 1000;

        document.addEventListener('mousemove', dragItem);
        document.addEventListener('mouseup', stopDrag);
    }
}

function dragItem(event) {
    if (selectedItem) {
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;
        selectedItem.style.left = x + 'px';
        selectedItem.style.top = y + 'px';
    }
}

function stopDrag() {
if (selectedItem) {
document.removeEventListener('mousemove', dragItem);
document.removeEventListener('mouseup', stopDrag);
const tableElement = document.getElementById('table');
if (tableElement) {
    const tableRect = tableElement.getBoundingClientRect();
    const itemRect = selectedItem.getBoundingClientRect();

    // Check if the item is placed in the correct position
    const isCorrectPosition = checkCorrectPosition(selectedItem, tableRect, itemRect);
    
    console.log("Is correct position:", isCorrectPosition);

 

    // Update the score display
  
selectedItem = null;
attempts--;
document.getElementById('attemptsDisplay').textContent = 'Attempts left: ' + attempts;
if (attempts === 0) {
    items.forEach(item => {
        item.removeEventListener('mousedown', startDrag);
    });
}
}
}

}




function startTimer() {
const timerInterval = setInterval(() => {
const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;

const minutesDisplay = minutes < 10 ? '0' + minutes : minutes;
const secondsDisplay = seconds < 10 ? '0' + seconds : seconds;

document.getElementById('timeDisplay').textContent = `${minutesDisplay}:${secondsDisplay}`;

if (timeLeft === 0) {
    clearInterval(timerInterval);
    disableDrag(); // Call the function to disable drag
} else {
    timeLeft--;
}
}, 1000);
}

function disableDrag() {
items.forEach(item => {
item.removeEventListener('mousedown', startDrag);
});
}

startTimer(); // Start the timer when the script loads

function checkCorrectPosition(item) {
    const correctPositions = {
        'placeMat': 'middle',
        'fork': 'left',
        'spoon': 'right',
        'knife': 'right',
        'rose': 'top',
        'salt': 'top',
        'pepper': 'top',
        'waterglass': 'top',
        'napkin': 'middle'
    };

    const currentPosition = getCurrentPosition(item);

    return currentPosition === correctPositions[item.id];
}

function getCurrentPosition(item) {
    const tableHeight = 1200;
    const tableWidth = 1200;
    const itemTop = parseInt(item.style.top.replace('px', ''));
    const itemBottom = itemTop + item.height;
    const itemLeft = parseInt(item.style.left.replace('px', ''));
    const itemRight = itemLeft + item.width;

    // Define realistic positions based on the table dimensions
    const topThreshold = tableHeight / 6;
    const bottomThreshold = (4 * tableHeight) / 10;
    const leftThreshold = tableWidth / 10;
    const rightThreshold = (4.5 * tableWidth) / 10;

    // Check the position of the item relative to the thresholds
    if (itemTop < topThreshold) {
        return 'top';
    } else if (itemTop > bottomThreshold) {
        return 'bottom';
    } else if (itemLeft < leftThreshold) {
        return 'left';
    } else if (itemRight > rightThreshold) {
        return 'right';
    } else {
        return 'middle';
    }
}
