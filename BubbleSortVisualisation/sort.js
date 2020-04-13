const width = window.screen.availWidth - 20;
const height = window.screen.availHeight - 330;
const container = document.getElementById('dataContainer');

function GenerateRandomValues() {
    for (let i = 0; i < (width / 40) - 1; i++) {
        let value = Math.floor(Math.random() * height);
        let block = document.createElement('div');
        block.classList.add('block');
        block.style.height = value;
        let xValue = (i + 1) * 25;
        block.style.transform = "translateX(" + xValue + "px)";
        let valueText = document.createElement('label');
        valueText.classList.add('value-label');
        valueText.innerHTML = value;
        block.appendChild(valueText);
        container.appendChild(block);
    }
}

function Swap(elm1, elm2) {
    return new Promise(resolve => {
        let pos1 = window.getComputedStyle(elm1).getPropertyValue('transform');
        let pos2 = window.getComputedStyle(elm2).getPropertyValue('transform');
        elm1.style.transform = pos2;
        elm2.style.transform = pos1;
        window.requestAnimationFrame(function () {
            setTimeout(() => {
                container.insertBefore(elm2, elm1);
                resolve();
            }, 300);
        });
    });
}
async function Sort() {
    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length - 1; i++) {
        for (let j = 0; j < blocks.length - i - 1; j++) {
            blocks[j].style.backgroundColor = "#FF1212";
            blocks[j + 1].style.backgroundColor = "#FF1212";
            await new Promise(resolve => setTimeout(() => {
                resolve();
            }, 200));
            const val1 = Number(blocks[j].childNodes[0].innerHTML);
            const val2 = Number(blocks[j + 1].childNodes[0].innerHTML);
            if (val1 > val2) {
                await Swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }
            blocks[j].style.backgroundColor = "#237FD8";
            blocks[j + 1].style.backgroundColor = "#237FD8";
        }
        blocks[blocks.length - i - 1].style.backgroundColor = "#12CC12";
    }
    blocks[0].style.backgroundColor = "#12CC12";
}
GenerateRandomValues();
Sort();