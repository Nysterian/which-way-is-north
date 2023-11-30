export const moduleID = 'which-way-is-north';
export const templateFile = 'modules/' + moduleID + '/templates/configForm.handlebars';
export const defaultFlags = {
    src: 'modules/' + moduleID + '/assets/images/compass.png',
    rot: 0,
    width: 100,
    height: 100,
    opacity: 0.5,
    enabled: false
}


export function addElement(childOf, elementType, elementParams) {
    const element = document.createElement(elementType);
    elementParams = elementParams == null ? {} : elementParams;

    applyParams(element, elementParams);

    childOf.appendChild(element);
    return element;
}

export function editElement(elementID, elementParams) {
    const element = document.querySelector('#' + elementID);

    if (element != null) applyParams(element, elementParams);
    return element
}

function applyParams(element, elementParams) {
    for (const [param, value] of Object.entries(elementParams)) {
        if (typeof value == 'object') {
            for (const [subParam, subValue] of Object.entries(value)) {
                element[param][subParam] = subValue;
            }
        }
        else {
            element[param] = value;
        }
    };
}

export function getMyFlag(flagName, app) {
    let myFlag = null

    if (app == null) {
        myFlag = game.scenes.current.getFlag(moduleID, flagName);

        if (myFlag == null) {
            myFlag = defaultFlags[flagName];
            game.scenes.current.setFlag(moduleID, flagName, myFlag);
        }
    } 
    else {
        myFlag = app.object.getFlag(moduleID, flagName);

        if (myFlag == null) {
            myFlag = defaultFlags[flagName];
            app.object.setFlag(moduleID, flagName, myFlag);
        }
    }

    return myFlag;
}