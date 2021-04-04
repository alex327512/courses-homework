const addInput = document.querySelector('.add-input');
const addNewBlocksBtn = document.querySelector('.add-btn');
const regExp = /\w+/gi


addNewBlocksBtn.addEventListener('click', () => {

    const inputValue = addInput.value;
    const valueArr = [...inputValue.matchAll(regExp)].map(valueItem => valueItem[0]).map(val => Number(val) ? Number(val) : val);
    addInput.value = '';
    if(valueArr.length < 6 || (valueArr.length === 7 && Number.isInteger(valueArr[6]))) {
        addBlocksFromArray(valueArr);
    } else {
        console.error('Nesting is too deep');
    }
})


function addBlocksFromArray(values) {
    const parent = document.querySelector(values[0]);
    
    parent.classList.add('parent');
    children = values;
    children.splice(0, 1);

    if(children.length >= 2) {
        if(children.length === 2 && Number.isInteger(children[1])) {
            createSeparateElements(parent, children[1], 'first')
        } else {
           const parentFirstNesting = createSeparateElements(parent, 1, 'first')
            children.splice(0, 1);
            if(children.length === 2 && Number.isInteger(children[1])) {
                createSeparateElements(parentFirstNesting, children[1], 'second')
            } else {
               const parentSecondNesting = createSeparateElements(parentFirstNesting, 1, 'second')
                children.splice(0, 1);
                if(children.length === 2 && Number.isInteger(children[1])) {
                    createSeparateElements(parentSecondNesting, children[1], 'third')
                } else {
                   const parentThirdNesting =  createSeparateElements(parentSecondNesting, 1, 'third')
                    children.splice(0, 1);
                    if(children.length === 2 && Number.isInteger(children[1])) { 
                        createSeparateElements(parentThirdNesting, children[1], 'forth')
                    } else {
                        const parentForthNesting = createSeparateElements(parentThirdNesting, 1, 'forth')
                        children.splice(0, 1);
                        if(children.length === 2 && Number.isInteger(children[1])) {
                            createSeparateElements(parentForthNesting, children[1], 'fifth')
                        } else {
                           const parentFifthNesting = createSeparateElements(parentForthNesting, 1, 'fifth')
                            children.splice(0, 1);
                            if(children.length === 2 && Number.isInteger(children[1])) { 
                                createSeparateElements(parentFifthNesting, children[1], 'sixth')
                            } else {
                                createSeparateElements(parentFifthNesting, 1, 'sixth')
                                children.splice(0, 1);
                            }
                        }
                    }
                    
                }
            }
        }
    } else {
        createSeparateElements(parent, 1, 'first')
    }
}

function createSeparateElements(parent, amount, className) {

    for(let i = 0; i < amount; i++) {
        const el = document.createElement(children[0]);
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = 'X';
        deleteBtn.addEventListener('click', function(event) {
            parent.removeChild(el);
        })
        el.className = className;
        el.appendChild(deleteBtn);
        parent.appendChild(el);
        if(amount === 1 ) {
            return el;
        }
    }
}

function createSingleElement(parent, element, className) {

    const el = document.createElement(element);
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = 'X';
    deleteBtn.addEventListener('click', function(event) {
        parent.removeChild(el);
    })
    el.className = className;
    el.appendChild(deleteBtn);
    parent.appendChild(el);
    return el;
}


// currying----------------------
function makeBlock(parent) {
    const container = document.querySelector(parent);
    container.classList.add('parent');
    try {
    
    return (firstNesting) => {
        const firstNest = createSingleElement(container, firstNesting, 'first');
        return (secondNesting) => {
            if (Number.isInteger(parseInt(secondNesting))) {
                for(let i = 0; i < secondNesting; i++) {
                    createSingleElement(container, firstNesting, 'first');
                }
                return;
            } 
            const secondNest = createSingleElement(firstNest, secondNesting, 'second');
            return (thirdNesting) => {
                if (Number.isInteger(parseInt(thirdNesting))) {
                    for(let i = 0; i < thirdNesting; i++) {
                        createSingleElement(firstNest, secondNesting, 'second');
                    }
                    return;
                } 
                const thirdNest = createSingleElement(secondNest, thirdNesting, 'third');
                return (forthNesting) => {
                    if (Number.isInteger(parseInt(forthNesting))) {
                        for(let i = 0; i < forthNesting; i++) {
                            createSingleElement(secondNest, thirdNesting, 'third');
                        }
                        return;
                    } 
                    const forthNest = createSingleElement(thirdNest, forthNesting, 'forth');
                    return (fifthNesting) => {
                        if (Number.isInteger(parseInt(fifthNesting))) {
                            for(let i = 0; i < fifthNesting; i++) {
                                createSingleElement(thirdNest, forthNesting, 'forth');
                            }
                            return;
                        } 
                        const fifthNest = createSingleElement(forthNest, fifthNesting, 'fifth');
                        return (sixthNesting) => {
                            if (Number.isInteger(parseInt(sixthNesting))) {
                                for(let i = 0; i < sixthNesting; i++) {
                                    createSingleElement(forthNest, fifthNesting, 'fifth');
                                }
                                return;
                            } 
                            createSingleElement(fifthNest, sixthNesting, 'sixth');
                            return (seventhhNesting) => {
                                if (Number.isInteger(parseInt(seventhhNesting))) {
                                    for(let i = 0; i < sixthNesting; i++) {
                                        createSingleElement(fifthNest, sixthNesting, 'sixth');
                                        return;
                                    }
                                } else {
                                    console.error('Nesting is too deep')
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
catch(e) {
    console.error('Ooops. Something went wrong.')
}
}

