/*
    Import the necessary node modules and A-frame components here
*/

import 'aframe-event-set-component';
import 'aframe-super-keyboard';

//Config
require('./.env.js');

//Services
require('./services/ApiService.js');
require('./services/DataService.js');

//Controllers
require('./controllers/ToolController.js');
require('./controllers/TableController.js');
require('./controllers/CameraController.js');

//Components
require('./components/cell-component.js');
require('./components/select-tool-component.js');
require('./components/table-component.js');
require('./components/tools-belt-component.js');
require('./components/moving-tool-component.js');
require('./components/moving-tool-up-component.js');
require('./components/moving-tool-down-component.js');
require('./components/moving-tool-vreset-component.js');
require('./components/moving-tool-hreset-component.js');
require('./components/display-manager-component.js');
require('./components/display-button-component.js');
require('./components/more-component.js');
require('./components/cell-details-component.js');
require('./components/details-button-component.js');
require('./components/confirmation-tool-component.js');
require('./components/group_by-tool-component.js');
