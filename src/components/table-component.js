AFRAME.registerComponent('table', {
    schema: {
        cellHauteur:    {type: 'number'},
        dataMatrix:     {type: 'array'},
        nbrCol:         {type: 'int'},
        radius:         {type: 'number'}
    },

    multiple: true,

    init: function () {

       //pour les tests 
      /* dataMatrix = [
            ["TitleCol1", "TitleCol2", "TitleCol3", "TitleCol4", "TitleCol4", "TitleCol5", "TitleCol6", "TitleCol7", "TitleCol8", "TitleCol9", "TitleCol10", "TitleCol11", "TitleCol12", "TitleCol13", "TitleCol14"],
            ["01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110"],
            ["01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110"],
            ["01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110"],
            ["01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110"],
            ["01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110"],
            ["01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110", "01111111111111111110"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
            ["Col1", "Col2", "Col3", "Col4", "Col4", "Col5", "Col6", "Col7", "Col8", "Col9", "Col10", "Col11", "Col12", "Col13", "Col14"],
        ];*/

        dataMatrix = [  // BOUCHON !
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"]
            
        ];

        this.loadData(dataMatrix);
        this.display();
    },

    display:function (){

        this.clear() // efface le contenu actuel

        var mode = 2; // BOUCHON !  A MIGRER DANS UNE FUTURE CLASSE GENERALE ( PREFERENCE UTILISATEUR )

        var BgColor;
        var color1="";
        var color2="";
        var type="";
        

        for(var i = 0; i < this.data.dataMatrix.length; i++) {
            var ligne = this.data.dataMatrix[i];
            var message = Math.abs(i) - 1;
        
            if (message=='-1')
                message=' ';

            color1="#778899";
            color2="#708090";
            type = 'line';
        
            if (i%2)
                BgColor = color1;
            else
                BgColor = color2;

            /*// crée un nouvel élément a-entity 
            var newCell = document.createElement("a-entity");
            newCell.setAttribute('cell', 'message: '+ message +'; color: #000000; bgColor: '+BgColor+'; type:'+type);

            switch (mode){
                case 1: //wall 
                    newCell.setAttribute('position', -1 +' '+ -(i-1)*this.data.cellHauteur +' 0');
                    newCell.setAttribute('rotation', '0 0 0');

                case 2: //half cylinder
                    newCell.setAttribute('position', -1 +' '+ -(i-1)*this.data.cellHauteur +' 0');
                    newCell.setAttribute('rotation', '0 0 0');

                case 3: //full cylinder
                    newCell.setAttribute('position', -1 +' '+ -(i-1)*this.data.cellHauteur +' 0');
                    newCell.setAttribute('rotation', '0 0 0');
            } 
            
            message=i-1;
            newCell.setAttribute('id', -1 +','+ message);
            this.el.appendChild(newCell);*/
        
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
                var offset ;
                
                switch (mode){
                    case 1: //wall 
                        newCell.setAttribute('position', j +' '+ -(i-1)*this.data.cellHauteur +' 0');
                        newCell.setAttribute('rotation', '0 0 0');
                        break;

                    case 2: //half cylinder
                    case 3: //full cylinder
                        if (mode == 2){
                            radius = this.data.radius * 2
                            angle  = ((360/ligne.length)*j)/2;
                            offset = 0;
                        }else{
                            radius = this.data.radius 
                            angle  = (360/ligne.length)*j;   
                            offset = radius/2;
                        }                
                        var x = radius * Math.sin(Math.PI * 2 * angle / 360);
                        var z = ( radius * Math.cos(Math.PI * 2 * angle / 360) ) * -1  ;
                        z += offset;
                        newCell.setAttribute('position', parseFloat(x).toFixed(3) +' '+ -(i-1)*this.data.cellHauteur +' '+parseFloat(z).toFixed(3));
                        newCell.setAttribute('rotation', '0 '+ -angle +' 0');
                        break;
                } 

                newCell.setAttribute('cell', 'message:'+ ligne[j] +'; color: #000000; bgColor: '+BgColor+'; type:'+type+'; angle:'+angle);
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
        this.data.nbrCol = this.data.dataMatrix[0].length;
        this.data.radius = (this.data.nbrCol * 2.5) / 15 ;
    }

});
