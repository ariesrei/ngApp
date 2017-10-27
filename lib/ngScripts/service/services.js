

/**********************************
| 	Simple ES6 Class Services
|**********************************/

class appService {
	
	constructor() {
		var vm = this;

		vm.dataObject = {
			message: 'Hello World'
		}
		return vm.dataObject;
	}
}

export default appService;
