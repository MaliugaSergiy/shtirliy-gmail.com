export default function findFocusableElement(containerElement, additionalSelectors = [], additionalContainer) {
    const selector = ["button", "[href]", "input", "select", "textarea", "[tabindex]:not([tabindex='-1'])", ...additionalSelectors].join(", ");
    let all = Array.from(containerElement.querySelectorAll(selector));


    if (additionalContainer) {
        const additionalContainerNode = document.querySelector(additionalContainer);
        const additionalNodes = Array.from(additionalContainerNode.querySelectorAll(selector));
        all = [...all, ...additionalNodes];
    }

    const allNotDisabled = all.filter(node => !node.disabled);
    const allDisabled = all.filter(node => node.disabled);

    return {
        all: {
            first: all[0],
            last: all[all.length - 1],
            all: all
        },
        notDisabled: {
            first: allNotDisabled[0],
            last: allNotDisabled[allNotDisabled.length - 1],
            all: allNotDisabled
        },
        disabled: {
            first: allDisabled[0],
            last: allDisabled[allDisabled.length - 1],
            all: allDisabled
        }
    }
}