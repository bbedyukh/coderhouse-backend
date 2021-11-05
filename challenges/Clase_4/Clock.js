const clock = () => {
    let today = new Date()
    let hour = today.getHours()
    let min = today.getMinutes()
    let sec = today.getSeconds()
    let ap

    ap = hour < 12 ? 'AM' : 'PM'
    hour = hour === 0 ? 12 : hour
    hour = hour > 12 ? hour - 12 : hour

    hour = validateTime(hour)
    min = validateTime(min)
    sec = validateTime(sec)

    console.log(`${hour}:${min}:${sec} ${ap}`)

    setTimeout(() => {
        clock()
    }, 1000)
}

const validateTime = date => {
    date < 10 ? (date = '0' + 1) : ''
    return date
}

clock()
