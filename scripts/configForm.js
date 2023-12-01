import { getMyFlag, templateFile, moduleID } from './common.js';
import { updateCompass } from './compass.js';

async function createForm(app, [html]) {
    delete _templateCache[templateFile];

    const basicsTab = html.querySelector('div[data-tab="basic"]');
    const renderedHTML = await renderTemplate(templateFile, {
        moduleID: moduleID,
        flagPath: `flags.${moduleID}`,
        src:      getMyFlag('src', app),
        rot:      getMyFlag('rot', app),
        width:    getMyFlag('width', app),
        height:   getMyFlag('height', app),
        opacity:  getMyFlag('opacity', app),
        enabled:  getMyFlag('enabled', app)
    });
    basicsTab.insertAdjacentHTML('beforeend', renderedHTML);
    app.activateListeners($('div[data-tab="basic"]'));

    app.setPosition();
    //console.log(basicsTab);
}

Hooks.on('init', () => loadTemplates([templateFile]));
Hooks.on('renderSceneConfig', createForm);
Hooks.on('updateScene', updateCompass);