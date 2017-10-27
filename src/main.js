
// Angular scripts
import AppController from '../lib/ngScripts/controller/controllers';
import AppService from '../lib/ngScripts/service/services';
import Directive from '../lib/ngScripts/directive/directives';

angular.module('ngApp', [])
    .controller('appController', AppController)
    .service('appService', AppService)
    .directive('entryOne', Directive.dir_fn_1)
    .directive('entryTwo', Directive.dir_fn_2);

module.exports = { AppController, AppService, Directive};



