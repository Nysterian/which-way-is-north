import { getMyFlag, templateFile } from './common.js';

async function createForm(app, html) {
    delete _templateCache[templateFile];

    const basicsTab = html.querySelector('div[data-tab="basic"]');
    const renderedHTML = await renderTemplate(templateFile, {
        src:     getMyFlag('src', app),
        rot:     getMyFlag('rot', app),
        width:   getMyFlag('width', app),
        height:  getMyFlag('height', app),
        opacity: getMyFlag('opacity', app),
        enabled: getMyFlag('enabled', app)
    });
    basicsTab.insertAdjacentHTML('beforeend', renderedHTML);    

    app.setPosition();
    //console.log(basicsTab);
}

Hooks.on('init', () => loadTemplates([templateFile]));
Hooks.on('renderSceneConfig', (app, [html]) => createForm(app, html));