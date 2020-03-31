export default function setHeight(start, to, element, duration, cb) {
    var change = to - start,
        currentTime = null;

    var animateHeight = function (timestamp) {
        if (!currentTime) currentTime = timestamp;
        var progress = timestamp - currentTime;
        var val = parseInt((progress / duration) * change + start);
        element.setAttribute("style", "height:" + val + "px;");
        if (progress < duration) {
            window.requestAnimationFrame(animateHeight);
        } else {
            cb();
        }
    };

    //set the height of the element before starting animation -> fix bug on Safari
    element.setAttribute("style", "height:" + start + "px;");
    window.requestAnimationFrame(animateHeight);
}