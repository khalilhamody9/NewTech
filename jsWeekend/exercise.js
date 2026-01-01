
function boolToWord(bool) {
  if (bool === true) {
    return "Yes";
  } else {
    return "No";
  }
}


function sumTwoSmallestNumbers(arr) {
  arr.sort(function (a, b) {
    return a - b;
  });
  return arr[0] + arr[1];
}

function binaryArrayToNumber(arr) {
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    result = result * 2 + arr[i];
  }

  return result;
}

function findNextSquare(sq) {
  let root = Math.sqrt(sq);

  if (root % 1 !== 0) {
    return -1;
  }

  return (root + 1) * (root + 1);
}

function findUniq(arr) {
  arr.sort();

  if (arr[0] !== arr[1]) {
    return arr[0];
  } else {
    return arr[arr.length - 1];
  }
}


function summation(num) {
  let sum = 0;

  for (let i = 1; i <= num; i++) {
    sum += i;
  }

  return sum;
}
function centuryFromYear(year) {
  return Math.ceil(year / 100);
}
function basicOp(operation, value1, value2) {
  if (operation === "+") return value1 + value2;
  if (operation === "-") return value1 - value2;
  if (operation === "*") return value1 * value2;
  if (operation === "/") return value1 / value2;
}

function nb_year(p0, percent, aug, p) {
  let years = 0;

  while (p0 < p) {
    p0 = p0 + (p0 * percent) / 100 + aug;
    years++;
  }

  return years;
}
function number(busStops) {
  let people = 0;

  for (let i = 0; i < busStops.length; i++) {
    people += busStops[i][0];
    people -= busStops[i][1];
  }

  return people;
}

function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let a = 0;
  let b = 1;

  for (let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }

  return b;
}


function tribonacci(signature, n) {
  let result = [];

  for (let i = 0; i < n; i++) {
    if (i < 3) {
      result.push(signature[i]);
    } else {
      result.push(
        result[i - 1] + result[i - 2] + result[i - 3]
      );
    }
  }

  return result;
}

function removeChar(str) {
  return str.substring(1, str.length - 1);
}

function repeatStr(count, src) {
  let result = "";

  for (let i = 0; i < count; i++) {
    result += src;
  }

  return result;
}

function accum(str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    let part = str[i].toUpperCase();

    for (let j = 0; j < i; j++) {
      part += str[i].toLowerCase();
    }

    result += part;

    if (i !== str.length - 1) {
      result += "-";
    }
  }

  return result;
}

function toWeirdCase(str) {
  let words = str.split(" ");
  let result = [];

  for (let word of words) {
    let newWord = "";

    for (let i = 0; i < word.length; i++) {
      if (i % 2 === 0) {
        newWord += word[i].toUpperCase();
      } else {
        newWord += word[i].toLowerCase();
      }
    }

    result.push(newWord);
  }

  return result.join(" ");
}
function abbrevName(name) {
  let parts = name.split(" ");
  return (
    parts[0][0].toUpperCase() +
    "." +
    parts[1][0].toUpperCase()
  );
}
function maskify(cc) {
  if (cc.length <= 4) return cc;

  let masked = "";
  for (let i = 0; i < cc.length - 4; i++) {
    masked += "#";
  }

  return masked + cc.slice(-4);
}

function findShort(s) {
  let words = s.split(" ");
  let min = words[0].length;

  for (let word of words) {
    if (word.length < min) {
      min = word.length;
    }
  }

  return min;
}
function longestWords(s) {
  let words = s.split(" ");
  let max = 0;

  for (let word of words) {
    if (word.length > max) {
      max = word.length;
    }
  }

  return words.filter(word => word.length === max);
}
