const RandomNumbers = (min, max, times) => {
  const object = {}
  for (let i = 0; i < times; i++) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min
    if (object.hasOwnProperty(number)) object[number] = object[number] + 1
    else object[number] = 1
  }
  console.log(object)
}

RandomNumbers(1, 20, 10000)
