import { moduleID, addElement, editElement, getMyFlag } from './common.js';

export function updateCompass() {
    const elementID = moduleID + '-compass';
    const src = getMyFlag('src');
    const rot = getMyFlag('rot');
    const width = getMyFlag('width');
    const height = getMyFlag('height');
    const opacity = getMyFlag('opacity');
    const enabled = getMyFlag('enabled');

    const visibility = enabled ? 'visible' : 'hidden';

    let elementParams = {
        style: {
            width: width + 'px',
            height: height + 'px',

            left: '-' + (Number(width) + 20) + 'px',
            rotate: rot + 'deg',

            opacity: opacity,
            visibility: visibility,
            backgroundImage: 'url(' + src + ')'
        }
    }

    if (document.querySelector('#' + elementID) == null) {
        elementParams.id = elementID;
        elementParams.style.position = 'absolute';
        elementParams.style.top = '0px';

        elementParams.style.backgroundSize = 'contain';
        elementParams.style.backgroundRepeat = 'no-repeat';

        addElement(document.querySelector('#ui-right'), 'figure', elementParams);
    }
    else editElement(elementID, elementParams);
}

Hooks.on('getSceneControlButtons', updateCompass);