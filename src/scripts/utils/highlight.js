import {
    addClass,
    removeClass
} from './';

const highlight = (element, highlightedClass, duration = 400) => {
    addClass(element, highlightedClass);

    setTimeout(() => removeClass(element, highlightedClass), duration);
}

export default highlight;