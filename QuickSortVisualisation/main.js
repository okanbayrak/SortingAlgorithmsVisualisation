//Slider
const slider = document.getElementById('delay');
const sliderValue = document.getElementById('sliderValue');
sliderValue.innerHTML = slider.value;
slider.oninput = function () {
    sliderValue.innerHTML = this.value;
}

const width = window.screen.width * .65;
const height = window.screen.height * .7;
const container = document.getElementById('dataContainer');

function GenerateRandomValues() {
    for (let i = 0; i < width / 20; i++) {
        let value = Math.floor(Math.random() * height);
        let block = document.createElement('div');
        block.classList.add('block');
        block.style.height = value;
        let xValue = (i + 1) * 20;
        block.style.transform = "translateX(" + xValue + "px)";
        let label = document.createElement('label');
        label.classList.add('value-label');
        label.innerHTML = value;
        block.appendChild(label);
        container.appendChild(block);
    }
}
async function Swap(index1, index2){
    await Sleep(100);
    let elem1 = blocks[index1];
    let elem2 = blocks[index2];
    let pos1 = window.getComputedStyle(elem1).getPropertyValue('transform');
    let pos2 = window.getComputedStyle(elem2).getPropertyValue('transform');
    elem1.style.transform = pos2;
    elem2.style.transform = pos1;
    container.insertBefore(elem2, elem1);
    container.insertBefore(elem1, blocks[index2 + 1]);
}
async function Partition(start, end){
    let pivot = Number(blocks[end].childNodes[0].innerHTML);
    let pivotIndex = start;
    for(let i = start; i < end; i++){
        let value = Number(blocks[i].childNodes[0].innerHTML);
        if(value < pivot){
            await Swap(pivotIndex, i);
            blocks = document.querySelectorAll('.block');
            pivotIndex++;
        }
    }
    await Swap(end, pivotIndex);
    blocks = document.querySelectorAll('.block')
    return pivotIndex;
}

let blocks = document.getElementsByClassName('block');
async function QuickSort(start, end){
    if(start >= end)
        return;
    let pivotIndex = await Partition(start, end);
    await QuickSort(start, pivotIndex - 1);
    await QuickSort(pivotIndex + 1, end);
}
function Sleep(delay){
    return new Promise(resolve => setTimeout(resolve, delay));
}
GenerateRandomValues();
QuickSort(0, blocks.length - 1);