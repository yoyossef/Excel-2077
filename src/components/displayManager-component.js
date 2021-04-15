import {TableController} from '../controllers/TableController.js';

AFRAME.registerComponent('displaymanager', {
    schema: {
    },

    init: function () {
        
        this.el.setAttribute('rotation', '45 0 0');

        // crée un nouvel élément a-entity
        var newDisplayBtn = document.createElement("a-entity");
        newDisplayBtn.setAttribute('position', '-0.5 0 0');
        newDisplayBtn.setAttribute('rotation', '0 0 0');
        newDisplayBtn.setAttribute('displaybtn', 'message: Wall; color: #000000; bgColor: #87CEFA; type: Wall;');
        newDisplayBtn.setAttribute('id', 'wallBtn');
        // ajoute le nouvel élément créé et son contenu dans le DOM
        this.el.appendChild(newDisplayBtn);

        newDisplayBtn = document.createElement("a-entity");
        newDisplayBtn.setAttribute('position', '0 0 0');
        newDisplayBtn.setAttribute('rotation', '0 0 0');
        newDisplayBtn.setAttribute('displaybtn', 'message: Half cylinder; color: #000000; bgColor: #9ACD32; type: HalfCylinder;');
        newDisplayBtn.setAttribute('id', 'halfCylinderBtn');
        // ajoute le nouvel élément créé et son contenu dans le DOM
        this.el.appendChild(newDisplayBtn);

        newDisplayBtn = document.createElement("a-entity");
        newDisplayBtn.setAttribute('position', '0.5 0 0');
        newDisplayBtn.setAttribute('rotation', '0 0 0');
        newDisplayBtn.setAttribute('displaybtn', 'message: Cylinder; color: #000000; bgColor: #F08080; type: Cylinder;');
        newDisplayBtn.setAttribute('id', 'cylinderBtn');
        // ajoute le nouvel élément créé et son contenu dans le DOM
        this.el.appendChild(newDisplayBtn);
    },
});
