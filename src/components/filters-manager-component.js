import {TableController} from '../controllers/TableController.js';

AFRAME.registerComponent('filters-manager', {
    schema: {
    },

    init: function () {
        // crée un nouvel élément a-entity
        var newFilterFunctionBtn = document.createElement("a-entity");
        newFilterFunctionBtn.setAttribute('position', '-0.15 0 0');
        newFilterFunctionBtn.setAttribute('filter-function-button', 'message:==; color: #222222;');
        newFilterFunctionBtn.setAttribute('id', '==btn');
        // ajoute le nouvel élément créé et son contenu dans le DOM
        this.el.appendChild(newFilterFunctionBtn);

        newFilterFunctionBtn = document.createElement("a-entity");
        newFilterFunctionBtn.setAttribute('position', '-0.05 0 0');
        newFilterFunctionBtn.setAttribute('filter-function-button', 'message:!=; color: #222222;');
        newFilterFunctionBtn.setAttribute('id', '!=btn');
        // ajoute le nouvel élément créé et son contenu dans le DOM
        this.el.appendChild(newFilterFunctionBtn);

        newFilterFunctionBtn = document.createElement("a-entity");
        newFilterFunctionBtn.setAttribute('position', '0.05 0 0');
        newFilterFunctionBtn.setAttribute('filter-function-button', 'message:>; color: #222222;');
        newFilterFunctionBtn.setAttribute('id', '>btn');
        // ajoute le nouvel élément créé et son contenu dans le DOM
        this.el.appendChild(newFilterFunctionBtn);

        newFilterFunctionBtn = document.createElement("a-entity");
        newFilterFunctionBtn.setAttribute('position', '0.15 0 0');
        newFilterFunctionBtn.setAttribute('filter-function-button', 'message:<; color: #222222;');
        newFilterFunctionBtn.setAttribute('id', '<btn');
        // ajoute le nouvel élément créé et son contenu dans le DOM
        this.el.appendChild(newFilterFunctionBtn);
    },
});
