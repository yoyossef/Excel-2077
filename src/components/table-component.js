import {TableController} from '../controllers/TableController.js';

AFRAME.registerComponent('table', {
    schema: {
        cellHeight:     {type: 'number', default: TableController.cellHeight},
        cellWidth:      {type: 'number', default: TableController.cellWidth},
        dataMatrix:     {type: 'array', default: []},
        nbrCol:         {type: 'int'},
        radius:         {type: 'number'}
    },

    multiple: true,

    init: function () {

       //pour les tests
        let dataMatrix = [];

        let nbCol = 20;
        let nbLines = 100;

        dataMatrix.push([]);
        for(let i = 0; i<nbCol; i++){
            dataMatrix[0].push("Col "+(i+1));
        }

        for(let i = 0; i< nbLines; i ++){
            let line = [];
            for(let j = 0; j<nbCol; j++){
                line.push(i+1);
            }
            dataMatrix.push(line);
        }

        this.loadData(dataMatrix);
        this.display();
    },

    display:function (){

        this.clear(); // efface le contenu actuel

        var BgColor;
        var color1="";
        var color2="";
        var type="";

        for(var i = 0; i < this.data.dataMatrix.length; i++) {
            var ligne = this.data.dataMatrix[i];
            var str = Math.abs(i) - 1;

            if (str=='-1')
                str=' ';

            if (i%2)
                BgColor = "#778899";
            else
                BgColor = "#708090";

            if (i==0){
                color1="#778899";
                color2="#708090";
                type ='header';
            }else{
                color1="#DCDCDC";
                color2="#D3D3D3";
                type='data';
            }

            for(var j = 0; j < ligne.length; j++) {

                if (i%2) {
                    BgColor = color1;
                }else{
                    BgColor = color2;
                }

                // crée un nouvel élément a-entity
                var newCell = document.createElement("a-entity");
                var angle  ;
                var radius ;
                switch (TableController.displayMode){
                    case 'Wall': //wall
                        if (type == 'header')
                            newCell.setAttribute('position', j*this.data.cellWidth +' '+ -(i-1)*this.data.cellHeight +'  -2.8');
                        else
                            newCell.setAttribute('position', j*this.data.cellWidth +' '+ -(i-1)*this.data.cellHeight +' -3');

                        newCell.setAttribute('rotation', '0 0 0');
                        break;

                    case 'HalfCylinder': //half cylinder
                    case 'Cylinder': //full cylinder
                        if (TableController.displayMode == 'HalfCylinder'){
                            angle  = ((360/ligne.length)*j)/2;
                        }else{
                            angle  = (360/ligne.length)*j;
                        }

                        if (type == 'header')
                            radius = this.data.radius-0.2;
                        else
                            radius = this.data.radius;

                        var x = radius * Math.sin(Math.PI * 2 * angle / 360);
                        var z = ( radius * Math.cos(Math.PI * 2 * angle / 360) ) * -1;
                        newCell.setAttribute('position', parseFloat(x).toFixed(3) +' '+ -(i-1)*this.data.cellHeight +' '+parseFloat(z).toFixed(3));
                        newCell.setAttribute('rotation', '0 '+ -angle +' 0');
                        break;
                }

                newCell.setAttribute('cell', 'fulldata:'+ ligne[j] +'; color: #000000; bgColor: '+BgColor+'; type:'+type+'; angle:'+angle);
                str = i-1;
                newCell.setAttribute('id', j+','+str);

                // ajoute le nouvel élément créé et son contenu dans le DOM
                this.el.appendChild(newCell);
            }
        }
    },

    events: {
        // click: function (evt) {
        //     TableController.moveHeaders('down');
        // }
    },

    clear:function (){
        while (this.el.firstChild) {
            this.el.removeChild(this.el.lastChild);
        }
    },

    changeDisplayMode:function (){

        this.setRadius();

        if (this.el.hasChildNodes()) {

            let numChild = 0
            var children = this.el.childNodes;

            for(var i = 0; i < this.data.dataMatrix.length; i++) {

                var ligne = this.data.dataMatrix[i];

                for(var j = 0; j < ligne.length; j++,numChild++) {

                    var angle  ;
                    var radius ;

                    switch (TableController.displayMode){

                        case 'Wall': //wall
                            if (children[numChild].components['cell'].data.type == 'header')
                                children[numChild].components['cell'].move(j*this.data.cellWidth,children[numChild].components['cell'].el.object3D.position.y,-2.8 );
                            else
                                children[numChild].components['cell'].move(j*this.data.cellWidth,-(i-1)*this.data.cellHeight,-3);

                            children[numChild].setAttribute('rotation', '0 0 0');
                            break;

                        case 'HalfCylinder': //half cylinder
                        case 'Cylinder': //full cylinder
                            if (TableController.displayMode == 'HalfCylinder'){
                                angle  = ((360/ligne.length)*j)/2;
                            }else{
                                angle  = (360/ligne.length)*j;
                            }

                            if (children[numChild].components['cell'].data.type == 'header')
                                radius = this.data.radius-0.2;
                            else
                                radius = this.data.radius;

                            var x = radius * Math.sin(Math.PI * 2 * angle / 360);
                            var z = ( radius * Math.cos(Math.PI * 2 * angle / 360) ) * -1;
                            children[numChild].components['cell'].data.angle = angle;
                            if(children[numChild].components['cell'].data.type == 'header'){
                                children[numChild].components['cell'].move(parseFloat(x).toFixed(3),children[numChild].components['cell'].el.object3D.position.y,parseFloat(z).toFixed(3));
                            }
                            else {
                                children[numChild].components['cell'].move(parseFloat(x).toFixed(3),-(i-1)*this.data.cellHeight,parseFloat(z).toFixed(3));
                            }
                            children[numChild].setAttribute('rotation', '0 '+ -angle +' 0');
                            break;
                    }
                }
            }
        }

    },

    loadData:function (newData){
        this.data.dataMatrix=newData;
        this.data.nbrCol = this.data.dataMatrix[0].length;
        this.setRadius();
    },

    addData:function (newData){
        if (this.data.nbrCol == newData[0].length ){
            let newStart = this.data.dataMatrix.length;
            this.data.dataMatrix=this.data.dataMatrix.concat(newData);

            var BgColor;
            var color1="";
            var color2="";
            var type="";

            for(var i = newStart; i < this.data.dataMatrix.length; i++) {
                var ligne = this.data.dataMatrix[i];
                var str;

                if (i%2)
                    BgColor = '#778899';
                else
                    BgColor = '#708090';

                color1="#DCDCDC";
                color2="#D3D3D3";
                type='data';

                for(var j = 0; j < ligne.length; j++) {

                    if (i%2) {
                        BgColor = color1;
                    }else{
                        BgColor = color2;
                    }

                    // crée un nouvel élément a-entity
                    var newCell = document.createElement("a-entity");
                    var angle  ;
                    var radius ;

                    switch (TableController.displayMode){
                        case 'Wall': //wall
                            if (type == 'header')
                                newCell.setAttribute('position', j*this.data.cellWidth +' '+ -(i-1)*this.data.cellHeight +'  -2.8');
                            else
                                newCell.setAttribute('position', j*this.data.cellWidth +' '+ -(i-1)*this.data.cellHeight +' -3');

                            newCell.setAttribute('rotation', '0 0 0');
                            break;

                        case 'HalfCylinder': //half cylinder
                        case 'Cylinder': //full cylinder
                            if (TableController.displayMode == 'HalfCylinder'){
                                angle  = ((360/ligne.length)*j)/2;
                            }else{
                                angle  = (360/ligne.length)*j;
                            }

                            if (type == 'header')
                                radius = this.data.radius-0.2;
                            else
                                radius = this.data.radius;

                            var x = radius * Math.sin(Math.PI * 2 * angle / 360);
                            var z = ( radius * Math.cos(Math.PI * 2 * angle / 360) ) * -1;
                            newCell.setAttribute('position', parseFloat(x).toFixed(3) +' '+ -(i-1)*this.data.cellHeight +' '+parseFloat(z).toFixed(3));
                            newCell.setAttribute('rotation', '0 '+ -angle +' 0');
                            break;
                    }

                    newCell.setAttribute('cell', 'fulldata:'+ ligne[j] +'; color: #000000; bgColor: '+BgColor+'; type:'+type+'; angle:'+angle);
                    str = i-1;
                    newCell.setAttribute('id', j+','+str);

                    // ajoute le nouvel élément créé et son contenu dans le DOM
                    this.el.appendChild(newCell);
                }
            }

        }
    },

    setRadius: function (){
        if (TableController.displayMode == 'HalfCylinder'){
            this.data.radius = ((this.data.nbrCol * 2.5) / 15)*2;
        }else{
            this.data.radius = (this.data.nbrCol * 2.5) / 15;
        }
        this.data.radius *= this.data.cellWidth;
    }
});
