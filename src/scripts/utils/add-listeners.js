export default function addListener(elements, event, callback) {
  Array.from(elements).forEach((element, index, array) =>
    element.addEventListener(
      event,
      callback({
        element,
        index,
        array
      })
    )
  );
}
