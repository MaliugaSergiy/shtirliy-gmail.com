export default function arrayToObject(arr, keyField, dataAttr) {
  if(dataAttr) {
    return Object.assign({}, ...arr.map(item => {
      return ({ [item[keyField][dataAttr]]: item })
    }));
  }
  return Object.assign({}, ...arr.map(item => ({ [item[keyField]]: item })));
}
