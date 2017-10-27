(function () {
'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var appController = function appController(appService) {
    classCallCheck(this, appController);


    var vm = this;
    //services
    vm.appService = appService;
    //name from controller
    vm.name = 'Johnny Weaker';

    //message from service
    vm.message = appService.message;
};

appController.$inject = ['appService'];

/**********************************
| 	Simple ES6 Class Services
|**********************************/

var appService = function appService() {
	classCallCheck(this, appService);

	var vm = this;

	vm.dataObject = {
		message: 'Hello World'
	};
	return vm.dataObject;
};

var Directive = function () {
	function Directive(template) {
		classCallCheck(this, Directive);

		var vm = this;
		vm.restrict = 'EA';
		vm.controller = DirectiveController;
		vm.template = template;
	}

	createClass(Directive, [{
		key: 'link',
		value: function link(scope, element, attr, ctr) {
			console.log('ctr', ctr);
			console.log('ZeroClipboard in link', ctr.ZeroClipboard);
			console.log('q in link', ctr.q);
		}
	}], [{
		key: 'dir_fn_1',
		value: function dir_fn_1() {
			var template = '<h3>Hi my name is: <span style="color:red;">{{appCtrl.name}}</span>. I am a directive.</h3>';
			return new Directive(template);
		}
	}, {
		key: 'dir_fn_2',
		value: function dir_fn_2() {
			var template = '<h3>Welcome: <span style="color:red">{{appCtrl.message}}</span>. I am a directive</h3>';
			return new Directive(template);
		}
	}]);
	return Directive;
}();

// do not $inject like this
// Directive.$inject = ['$q'];

var DirectiveController = function DirectiveController(q) {
	classCallCheck(this, DirectiveController);

	this.q = q;
	this.ZeroClipboard = 'zeroclipboard';
};

DirectiveController.$inject = ['$q'];

//export default  Directive.entryTable  ;

// Angular scripts
angular.module('ngApp', []).controller('appController', appController).service('appService', appService).directive('entryOne', Directive.dir_fn_1).directive('entryTwo', Directive.dir_fn_2);

module.exports = { AppController: appController, AppService: appService, Directive: Directive };

}());
