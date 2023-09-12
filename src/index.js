module.exports =
  function check(str, bracketsConfig) {
    const map = new Map;
    const open = new Set;
    const close = new Set;
    for (let i = 0; i < bracketsConfig.length; i++) {
      map.set(bracketsConfig[i][0], bracketsConfig[i][1]);
      open.add(bracketsConfig[i][0]);
      close.add(bracketsConfig[i][1]);
    }

    const stack = [];

    const chars = [...str];
    for (let i = 0; i < chars.length; i++) {
      if (open.has(chars[i]) && close.has(chars[i])) {    // когда открывающая и закрывающая скобки - одинаковые, например, '|'
        if (stack[0] === chars[i]) {   // считаем закрывающей
          stack.shift();
        } else {                       // считаем открывающей
          stack.unshift(chars[i]);
        }
      } else {
        if (open.has(chars[i])) stack.unshift(chars[i]);
        if (close.has(chars[i])) {
          if (chars[i] !== map.get(stack.shift())) return false;
        }
      }
    }

    return stack.length === 0;
  };


// console.log(check('([{888}]))', [['(', ')'], ['[', ']'], ['{', '}']]));
