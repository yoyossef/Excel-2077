AFRAME.registerComponent('table', {
    schema: {
        cellHauteur:    {type: 'number'},
    },

    multiple: true,

    init: function () {
        var data = [
            ["Chiffre", "Mots", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom", "Prénom"],
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
        
          var tableElement =  document.getElementById('table');
          var BgColor;
          var color1=""
          var color2=""
        
          for(var i = 0; i < data.length; i++) {
              var ligne = data[i];
              var message = Math.abs(i) - 1;
        
              if (message=='-1')
                message=' '
        
              color1="#778899"
              color2="#708090"
        
              if (i%2)
                BgColor = color1;
              else
                BgColor = color2;
              
              var newCell = document.createElement("a-entity");
              newCell.setAttribute('cell', 'message: '+ message +'; color: #000000; bgColor: '+BgColor);
              newCell.setAttribute('position', -1 +' '+ -(i-1)*this.data.cellHauteur +' 0');
              newCell.setAttribute('id', -1 +';'+ i-1);
              tableElement.appendChild(newCell);
        
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
        
                // crée un nouvel élément div
                var newCell = document.createElement("a-entity");
                newCell.setAttribute('cell', 'message:'+ ligne[j] +'; color: #000000; bgColor: '+BgColor);
                newCell.setAttribute('position', j +' '+ -(i-1)*0.22 +' 0');
                newCell.setAttribute('id', j-1 +';'+ i-1);
        
                // ajoute le nouvel élément créé et son contenu dans le DOM
                tableElement.appendChild(newCell);
              }
          }
    
    }

});
