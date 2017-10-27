
class appController {

    constructor(appService) {

    	var vm = this;
		//services
		vm.appService = appService;
		//name from controller
    	vm.name = 'Johnny Weaker';
 
        //message from service
        vm.message = appService.message;
    }

    
}

appController.$inject = ['appService'];

export default appController;