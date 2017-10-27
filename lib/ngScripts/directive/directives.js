
class Directive {

  constructor(template) {
	    var vm = this;
	    vm.restrict = 'EA';
	    vm.controller = DirectiveController;
	    vm.template = template;
  	}

  	link(scope, element, attr, ctr) {
	    console.log('ctr', ctr);
	    console.log('ZeroClipboard in link', ctr.ZeroClipboard);
	    console.log('q in link', ctr.q);
  	}

  	static dir_fn_1() {
	  	var template = '<h3>Hi my name is: <span style="color:red;">{{appCtrl.name}}</span>. I am a directive.</h3>';
	    return new Directive(template);
  	}


  	static dir_fn_2() {
	  	var template = '<h3>Welcome: <span style="color:red">{{appCtrl.message}}</span>. I am a directive</h3>';
	    return new Directive(template);
  	}
}


// do not $inject like this
// Directive.$inject = ['$q'];

class DirectiveController {
	constructor(q) {
		this.q = q;
		this.ZeroClipboard = 'zeroclipboard';
	}
}

DirectiveController.$inject = ['$q'];


export default Directive; 
//export default  Directive.entryTable  ;

