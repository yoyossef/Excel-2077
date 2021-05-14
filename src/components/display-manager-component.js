import {TableController} from '../controllers/TableController.js';

AFRAME.registerComponent('display-manager', {
    schema: {
    },

    init: function () {

        this.el.setAttribute('rotation', '45 0 0');

        // crée un nouvel élément a-entity
        var newDisplayBtn = document.createElement("a-entity");
        newDisplayBtn.setAttribute('position', '0 0.15 0');
        newDisplayBtn.setAttribute('rotation', '0 0 0');
        newDisplayBtn.setAttribute('display-button', 'message: Wall; color: #222222; type: Wall;');
        newDisplayBtn.setAttribute('id', 'wallBtn');
        // ajoute le nouvel élément créé et son contenu dans le DOM
        this.el.appendChild(newDisplayBtn);

        newDisplayBtn = document.createElement("a-entity");
        newDisplayBtn.setAttribute('position', '0 0.075 0');
        newDisplayBtn.setAttribute('rotation', '0 0 0');
        newDisplayBtn.setAttribute('display-button', 'message: Half cylinder; color: #222222; type: HalfCylinder;');
        newDisplayBtn.setAttribute('id', 'halfCylinderBtn');
        // ajoute le nouvel élément créé et son contenu dans le DOM
        this.el.appendChild(newDisplayBtn);

        newDisplayBtn = document.createElement("a-entity");
        newDisplayBtn.setAttribute('position', '0 0 0');
        newDisplayBtn.setAttribute('rotation', '0 0 0');
        newDisplayBtn.setAttribute('display-button', 'message: Cylinder; color: #A9A9A9; type: Cylinder; enable: false;');
        newDisplayBtn.setAttribute('id', 'cylinderBtn');
        // ajoute le nouvel élément créé et son contenu dans le DOM
        this.el.appendChild(newDisplayBtn);
    },
});
