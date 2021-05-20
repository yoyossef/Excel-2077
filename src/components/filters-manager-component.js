import {CameraController} from '../controllers/CameraController.js';

/**
 * @module filters-manager-component
 * @category Component
*/
AFRAME.registerComponent('filters-manager', {
    schema: {
    },

    choosenCol:null,
    choosenFilterOp:null,
    choosenFilterArg:null,
    newKeyBoard: '',

    init: function () {
        // crée un nouvel élément a-entity
        var newFilterFunctionBtn = document.createElement("a-entity");
        newFilterFunctionBtn.setAttribute('position', '-0.15 0 -0.5');
        newFilterFunctionBtn.setAttribute('filter-function-button', 'op: ==; color: #222222; enable: false;');
        newFilterFunctionBtn.setAttribute('id', '==btn');
        // ajoute le nouvel élément créé et son contenu dans le DOM
        this.el.appendChild(newFilterFunctionBtn);

        this.choosenFilterOp='=='; //default value

        newFilterFunctionBtn = document.createElement("a-entity");
        newFilterFunctionBtn.setAttribute('position', '-0.05 0 -0.5');
        newFilterFunctionBtn.setAttribute('filter-function-button', 'op: !=; color: #222222;');
        newFilterFunctionBtn.setAttribute('id', '!=btn');
        // ajoute le nouvel élément créé et son contenu dans le DOM
        this.el.appendChild(newFilterFunctionBtn);

        newFilterFunctionBtn = document.createElement("a-entity");
        newFilterFunctionBtn.setAttribute('position', '0.05 0 -0.5');
        newFilterFunctionBtn.setAttribute('filter-function-button', 'op: <; color: #222222;');
        newFilterFunctionBtn.setAttribute('id', '>btn');
        // ajoute le nouvel élément créé et son contenu dans le DOM
        this.el.appendChild(newFilterFunctionBtn);

        /*newFilterFunctionBtn = document.createElement("a-entity");
        newFilterFunctionBtn.setAttribute('position', '0.15 0 -0.5');
        newFilterFunctionBtn.setAttribute('filter-function-button', 'op: >; color: #222222;');
        newFilterFunctionBtn.setAttribute('id', '<btn');
        // ajoute le nouvel élément créé et son contenu dans le DOM
        this.el.appendChild(newFilterFunctionBtn);*/

    },

    enable: function () {
        let camera = CameraController.getCamera();
		let position = Object.assign({},camera.el.getAttribute('position')); //cloning camera position
		let rotation = camera.el.getAttribute('rotation');//cloning camera rotation
		this.el.setAttribute('position', position);
        this.el.setAttribute('rotation',{y:rotation.y},true);
        this.el.setAttribute('visible',true);
        this.newKeyBoard = document.createElement("a-entity");
        this.newKeyBoard.setAttribute('id', 'keyboardFilter');
        this.newKeyBoard.setAttribute('position', '0 -0.25 -0.5');
        this.newKeyBoard.setAttribute('rotation', '-30 0 0');
        this.newKeyBoard.setAttribute('super-keyboard', {
            hand: '#rightHand',
            imagePath: './img/',
            width: '0.6'
        });
        this.el.appendChild(this.newKeyBoard);
    },

    disable: function () {
        this.choosenCol ='';
        //this.choosenFilterOp =''; //we keep the old one in case of the user forget it 
        this.choosenFilterArg ='';

        this.el.setAttribute('visible',false);
        this.el.setAttribute('position', '0 30 0');

        if (this.newKeyBoard != ''){
            this.el.removeChild(this.newKeyBoard);
            this.newKeyBoard=''
        }
    },

    events: {
        superkeyboardinput: function(evt) {
            this.choosenFilterArg = evt.detail.value;
            document.getElementById('filterTool').components['filter-tool'].addTriplet(this.choosenCol.data.fulldata,this.choosenFilterOp,this.choosenFilterArg);

            this.choosenCol.el.setAttribute('material', {
                color: '#DA70D6',
            });

            this.disable();
        },
    },

});
