Math.randomInt = function(min, max) {
    if (typeof max === 'undefined') {
        max = min
        min = 0
    }

    return Math.floor(Math.random() * (max - min + 1)) + min
}

Math.randomFloat = function(min, max) {
    if (typeof max === 'undefined') {
        max = min
        min = 0
    }

    return (Math.random() * (max - min + 1)) + min
}

Math.randomAngle = function() {
    return Math.randomFloat(-Math.PI, Math.PI)
}

Math.lerp = function(value1, value2, amount) {
    return value1 + (value2 - value1) * amount
}

Math.wrap = function(value, lower, upper) {
    if (value >= lower && value <= upper) return value

    return (value % (upper - lower)) + lower
}

Math.lerpAngle = function(value1, value2, amount) {
    const difference = Math.abs(value2 - value1)
    
    if (difference > Math.PI) {
        if (value1 > value2) {
            value2 += Math.PI * 2
        } else {
            value1 += Math.PI * 2
        }
    }

    const value = Math.lerp(value2, value1, amount)
    
    return Math.wrap(value, 0, Math.PI * 2)
}