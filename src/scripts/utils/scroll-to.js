Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

export default function scrollTo(final, duration, callback) {
    var start = window.scrollY || document.documentElement.scrollTop,
        currentTime = null;

    var animateScroll = function (timestamp) {
        if (!currentTime) currentTime = timestamp;
        var progress = timestamp - currentTime;
        if (progress > duration) progress = duration;
        var val = Math.easeInOutQuad(progress, start, final - start, duration);
        window.scrollTo(0, val);
        if (progress < duration) {
            window.requestAnimationFrame(animateScroll);
        } else {
            callback && callback();
        }
    };

    window.requestAnimationFrame(animateScroll);
};