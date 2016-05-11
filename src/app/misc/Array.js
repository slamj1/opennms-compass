/* eslint-disable no-extend-native, no-magic-numbers, no-void */

if (typeof Array.prototype.filter !== 'function') {
	Array.prototype.filter = function(fun/*, thisArg*/) {
		'use strict';
		/*jshint bitwise: false*/

		if (this === void 0 || this === null) {
			throw new TypeError();
		}

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== 'function') {
			throw new TypeError();
		}

		var res = [];
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t) {
				var val = t[i];

				// NOTE: Technically this should Object.defineProperty at
				//			 the next index, as push can be affected by
				//			 properties on Object.prototype and Array.prototype.
				//			 But that method's new, and collisions should be
				//			 rare, so use the more-compatible alternative.
				if (fun.call(thisArg, val, i, t)) {
					res.push(val);
				}
			}
		}

		return res;
	};
}

if (typeof Array.prototype.difference !== 'function') {
	Array.prototype.difference = function(e) {
		'use strict';
		var self = this;
		return self.filter(function(entry) {
			return e.indexOf(entry) === -1;
		}).concat(e.filter(function(entry) {
			return self.indexOf(entry) === -1;
		}));
	};
}

if (typeof Array.prototype.remove !== 'function') {
	Array.prototype.remove = function(e) {
		'use strict';
		var index = this.indexOf(e);
		if (index >= 0) {
			this.splice(index, 1);
		}
		return this;
	}
}

/* eslint-enable no-extend-native, no-magic-numbers, no-void */