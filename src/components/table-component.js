AFRAME.registerComponent('table', {
    schema: {
        cellHauteur:    {type: 'number'},
        dataMatrix:     {type: 'array'}
    },

    multiple: true,

    init: function () {

       //pour les tests 
       this.data.dataMatrix = [
            ["Chiffre", "Mots", "Prenom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
            [1, "Aubergine", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan", "Dylan"],
        ];

        this.display();

    },

    display:function (){

        this.clear() // efface le contenu actuel

        var BgColor;
        var color1=""
        var color2=""
    
        for(var i = 0; i < this.data.dataMatrix.length; i++) {
            var ligne = this.data.dataMatrix[i];
            var message = Math.abs(i) - 1;
        
            if (message=='-1')
                message=' '

            color1="#778899"
            color2="#708090"
        
            if (i%2)
                BgColor = color1;
            else
                BgColor = color2;
            // crée un nouvel élément a-entity 
            var newCell = document.createElement("a-entity");
            newCell.setAttribute('cell', 'message: '+ message +'; color: #000000; bgColor: '+BgColor);
            newCell.setAttribute('position', -1 +' '+ -(i-1)*this.data.cellHauteur +' 0');
            message=i-1 
            newCell.setAttribute('id', -1 +','+ message);
            this.el.appendChild(newCell);
        
            if (i==0){
                color1="#778899"
                color2="#708090"
            }else{
                color1="#DCDCDC"
                color2="#D3D3D3"
            }
        
            for(var j = 0; j < ligne.length; j++) {
        
                if (i%2) {
                if (j%2)
                    BgColor = color1;
                else
                    BgColor = color2;
                } else {
                if (j%2)
                    BgColor = color2; 
                else
                    BgColor = color1;  
                }
        
                // crée un nouvel élément a-entity
                var newCell = document.createElement("a-entity");
                newCell.setAttribute('cell', 'message:'+ ligne[j] +'; color: #000000; bgColor: '+BgColor);
                newCell.setAttribute('position', j +' '+ -(i-1)*this.data.cellHauteur +' 0');
                message = i-1;
                newCell.setAttribute('id', j+','+message);
        
                // ajoute le nouvel élément créé et son contenu dans le DOM
                this.el.appendChild(newCell);
            }
        }

    },

    clear:function (){
        while (this.el.firstChild) {
            this.el.removeChild(this.el.lastChild);
        }
    },

    loadData:function (newData){
        this.data.dataMatrix=newData;
    }

});
