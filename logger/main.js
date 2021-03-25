function MySet() {
    let collection = []
    this.has = function(element) {
        return (collection.indexOf(element) !== -1)
    }

    this.values = function() {
        return collection
    }

    this.size = function() {
        return collection.length
    }

    this.add = function(element) {
        if (!this.has(element)) {
            collection.push(element)
            return true
        }
        return false
    }

    this.remove = function(element) {
        if (this.has(element)) {
            index = collection.indexOf(element)
            collection.splice(index, 1)
            return true
        }
        return false
    }

    this.union = function(otherSet) {
        let unionSet = new MySet()
        let firstSet = this.values()
        let secondSet = otherSet.values()
        firstSet.forEach(i => unionSet.add(i))
        secondSet.forEach(i => unionSet.add(i))
    }

    this.intersection = function(otherSet) {
        let intersectionSet = new MySet()
        let firstSet = this.values()
        firstSet.forEach(function(e) {
            if (otherSet.has(e)) {
                intersectionSet.add(e)
            }
        })
        return intersectionSet
    }

    this.difference = function(otherSet) {
        let differenceSet = new MySet()
        let firstSet = this.values()
        firstSet.forEach(function(e) {
            if (!otherSet.has(e)) {
                differenceSet.add(e)
            }
        })
        return differenceSet
    }

    this.subset = function(otherSet) {
        let firstSet = this.values()
        return firstSet.every(value => otherSet.has(value))
    }
}

originalLog = console.log;
  console.log = function () {
    var args = [].slice.call(arguments);
    originalLog.apply(console.log,[getCurrentDateString()].concat(args));
  };
  function getCurrentDateString() {
    date = new Date();
    return `${date.getMinutes()}:${date.getHours()} ${date.getMonth()} ${date.getFullYear()} ||`;
  };

window.addEventListener('load', () => {
    let input = document.querySelector('.manipulation__field');
    let addBtn = document.querySelector('.manipulation__button-add');
    let removeBtn = document.querySelector('.manipulation__button-remove');
    let hasBtn = document.querySelector('.manipulation__button-has');
    let numSet = new MySet()

    addBtn.addEventListener('click', () => {
        let isAdded = numSet.add(input.value);
        if (isAdded) {
            console.log(`Value (${input.value}) was added`)
        } else {
            console.log(`Value (${input.value}) wasn't added`)
        }
        input.value = '';
    })

    removeBtn.addEventListener('click', () => {
        let isRemoved = numSet.remove(input.value);
        if (isRemoved) {
            console.log(`Value (${input.value}) was removed`)
        } else {
            console.log(`Value (${input.value}) wasn't found`)
        }
        input.value = '';
    })

    hasBtn.addEventListener('click', () => {
        let isThere = numSet.has(input.value);
        if (isThere) {
            console.log(`There is value (${input.value})`)
        } else {
            console.log(`There isn't value (${input.value})`)
        }
        input.value = '';
    })
})