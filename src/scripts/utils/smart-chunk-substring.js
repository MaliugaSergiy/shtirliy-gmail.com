export default function smartChunkSubstring(str, maxLength) {
  // initialize array (not required but verbose)
  var slices = [];

  // while string is not empty
  // take {maxLength} characters
  // check witch one was the last space or if the end of the line is reached
  // then => push them in slices
  // then => remove them from the string

  while (str != '') {
    var lastSpace = 0;

    for (var i = 0; i < str.length && i < maxLength; i++) {
      if (str[i] == ' ') {
        lastSpace = i;
      }
      if (i == str.length - 1) {
        lastSpace = str.length;
      }
    }

    // insert into array (including trailing space, see below the codeblock)
    slices.push(str.slice(0, lastSpace));
    str = str.slice(lastSpace);
  }

  return slices;
}
