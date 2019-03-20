let btnAdd = document.getElementById('button-add');
let columnWrapper = document.getElementById('column-wrapper');

let keeper = resetColumnKeeper();
let activeColumn;

let noteNumb = 1;

btnAdd.onclick = function() {
    columnSlide();
    let tmp = createNote();
    activeColumn.insertBefore(tmp, activeColumn.firstChild);
}

function createNote() {
    let wrapper = document.createElement('div');
    wrapper.classList.add('note-wrapper');

    let header = document.createElement('div');
    header.className = 'note-header';

    let name = document.createElement('input');
    name.placeholder = generateName();
    
    let btn = document.createElement('button');
    btn.innerHTML = 'X';
    btn.onclick = function() {     
        let tmp = btn.parentElement.parentElement;
        
        tmp.classList.add('slide-up');

        for(let i = 0; i < tmp.childNodes.length; i++) {
           tmp.childNodes[i].classList.add('disappear');
        }

        setTimeout(function() {keeper = resetColumnKeeper(); tmp.remove();}, 300);
    }
    

    header.appendChild(name);
    header.appendChild(btn);

    let txt = document.createElement('textarea');
    txt.rows = 5;
    txt.cols = 30;
    txt.name = 'yolo';
    txt.className = 'note-text';
    txt.placeholder = '...';
    txt.spellcheck = false;
    txt.oninput = function() {
        this.style.height = this.scrollHeight + "px";
        let tmp = this.scrollHeight + 50;
        this.parentElement.style.maxHeight = tmp + "px";
    }

    wrapper.appendChild(header);
    wrapper.appendChild(txt);

    return wrapper;
}

function resetColumnKeeper() {
    let keeper = new Object();

    let t_columns = columnWrapper.childNodes;
    for(let i = 0; i < t_columns.length; i++) {
        if (t_columns[i].className == 'wrapper-column active') {
            keeper[i] = t_columns[i].childNodes.length;
        }
    }

    return keeper;
}

function columnSlide() {
    let t_columns = columnWrapper.childNodes;
    let min = findMinColumn();
    activeColumn = t_columns[min];
    keeper[min]++;
}

function findMinColumn() {
    let min = keeper[1];
    let column = 1;

    for(let c in keeper) {
        if (keeper[c] < min) {
            min = keeper[c];
            column = c;
        }
    }

    return column;
}

function generateName() {
    let date = new Date();
    let result = '#' + noteNumb + ' ' + date.getDate() + ':' + date.getMonth() + ':' + date.getFullYear();
    noteNumb++;
    return result;
}

function columnResize(n) {
    let m = 0;
    for(let i = 0; i < columnWrapper.childNodes.length; i++) {
        if (columnWrapper.childNodes[i].className == 'wrapper-column active') {
            if (m < n) {
                columnWrapper.childNodes[i].className = 'wrapper-column';
            }
        }
    }

    resetColumnKeeper();
    console.log(m);
}

const mq = window.matchMedia("(min-width: 500px)");
mq.addListener(WidthChange);

function WidthChange(mq) {
    if (mq.matches) {
    // window width is at least 500px
    } else {
        columnResize(2);
    }
}
/*
<div class='note-wrapper'>
                <div class='note-header'>
                    <p>Lorem Ipsum</p>
                    <button>X</button>
                </div>
                <textarea rows = "10" cols = "30" name = "description"> </textarea>
            </div>
*/

//Рефакторинг
//Загрузка
//Адаптивность