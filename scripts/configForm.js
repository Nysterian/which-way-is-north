function toggle(doc, state = false) {
    doc.setFlag("myModule", "myFlag", !state);
    button.textContent = !state ? "on" : "off";
}

function createForm(app, html) {
    let src = getFlag(app, 'src', ''); //TODO change default to file path
    let rot = getFlag(app, 'rot', 0);

    // Basics Tab
    const basicsTab = html.querySelector('div[data-tab="basic"]');
    addElement(basicsTab, 'hr');


    // Image Container
    const imageContainer = addElement(basicsTab, 'div', {
        className: 'form-group'
    });
    
    // Image Label
    addElement(imageContainer, 'label', {
        innerHTML: 'Compass Image'
    });
    // Image Fields
    const imageFields = addElement(imageContainer, 'div', {
        className: 'form-fields'
    });
        // Browse Button
        const browse = addElement(imageFields, 'button', {
            type: 'button',
            className: 'file-picker',
            dataset: {
                type: 'imagevideo',
                target: 'compass.src'
            },
            title: 'Browse Files',
            tabIndex: '-1'
        });
        addElement(browse, 'i', {
            className: 'fas fa-file-import fa-fw',
        });
        // Browse File Picker
        addElement(imageFields, 'input', {
            className: 'image',
            type: 'text',
            name: 'compass.src',
            placeholder: 'File Path',
            value: src
        });
    // Image Notes
    addElement(imageContainer, 'p', {
        className: 'notes',
        innerHTML: 'Configure the image that is used for the compass.'
    });


    // Rotation Container
    const rotationContainer = addElement(basicsTab, 'div', {
        className: 'form-group'
    });

    // Rotation Label
    addElement(imageContainer, 'label', {
        innerHTML: 'Compass Rotation'
    });
    // Rotation Fields
    const rotationFields = addElement(imageContainer, 'div', {
        className: 'form-fields'
    });
        // Rotation Input
        addElement(rotationFields, 'input', {
            type: 'number',
            value: rot,
            step: '1',
            name: 'compass.rot'
        });
    // Image Notes
    addElement(imageContainer, 'p', {
        className: 'notes',
        innerHTML: 'Value in degrees that the compass image should be rotated by.'
    });


    console.log(basicsTab);
}

function addElement(childOf, elementType, elementParams) {
    const element = document.createElement(elementType);
    elementParams = elementParams == null ? {} : elementParams;

    for ([param, value] of Object.entries(elementParams)) {
        element[param] = value
    };

    childOf.appendChild(element);
    return element
}

function getFlag(app, flagName, defaultVal) {
    let myFlag = app.object.getFlag('which-way-is-north', flagName);
    if (myFlag == null) {
        myFlag = defaultVal;
        app.object.setFlag('which-way-is-north', flagName, defaultVal);
    }
    return myFlag
}

Hooks.on("renderSceneConfig", (app, [html]) => {
    createForm(app, html);
});