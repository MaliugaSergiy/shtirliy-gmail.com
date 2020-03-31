export function hasClass(element, className) {
    if (element.classList) return element.classList.contains(className);
    else return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

export function addClass(element, className) {
    const classList = className.split(' ');
    if (element.classList) element.classList.add(classList[0]);
    else if (!hasClass(element, classList[0])) element.className += " " + classList[0];
    if (classList.length > 1) addClass(element, classList.slice(1).join(' '));
};

export function removeClass(element, className) {
    const classList = className.split(' ');
    if (element.classList) element.classList.remove(classList[0]);
    else if (hasClass(element, classList[0])) {
        var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
        element.className = element.className.replace(reg, ' ');
    }
    if (classList.length > 1) removeClass(element, classList.slice(1).join(' '));
};

export function toggleClass(element, className, bool) {
    if (bool) addClass(element, className);
    else removeClass(element, className);
};

export function setAttributes(element, attrs) {
    for (let key in attrs) {
        element.setAttribute(key, attrs[key]);
    }
};

/* 
  DOM manipulation
*/
export function getChildrenByClassName(element, className) {
    const {
        children
    } = element,
    childrenByClass = [];
    for (var i = 0; i < children.length; i++) {
        if (hasClass(element.children[i], className)) childrenByClass.push(element.children[i]);
    }
    return childrenByClass;
};