/**
 * @class localDateTime
 * @verson 0.2
 * @author Christopher D Langton <chris@codewiz.biz>
 * @classDescription Convert Dates and Times to users local
 * @compatibility:
 *        IE 8+
 *        Firefox 4+
 *        Chrome 7+
 *        Safari 5.0.5+
 *        Opera 12+
 *        iOS Safari 4.0+
 *        Android Browser 2.1+
 *        Chrome for Android 28+
 *        Firefox for Android 23+
 *        Blackberry Browser 7.0+
 */
function ConvertDateTimes(arg,fn) { 'use strict';
	/**
	 * @property allow
	 * @type {String}
	 * @access private
	 * @default ['original','full','local','utc','iso']
	 */
	var allow = ['original','full','local','utc','iso'];
	/**
	 * @property timeElements
	 * @type {Array}
	 * @access private
	 */
    var timeElements = document.getElementsByTagName('time');
	/**
	 * @property elements
	 * @type {Array}
	 * @access public
	 */
    this.elements = [];
	/**
	 * @property options
	 * @type {Object}
	 * @access public
	 */
    this.options = {
		format:	'local'
	};
	/**
	 * @method setFormat
	 * @param {String} format A default date and time render type, use one of ['original','full','local','utc','iso']
	 * @access public
	 * @return {Object} Returns ConvertDateTimes for method chaining
	 */
    this.setFormat = function(format){
		for (var i = 0, j = allow.length; i < j; i++)
        if (format === allow[i]) this.options.format = format;
		return this;
	};
	/**
	 * @method init
	 * @param {Function} fn Callback function
	 * @access public
	 * @return {Object} Returns ConvertDateTimes for method chaining
	 */
    this.init = function(fn){
        var r = {};
        var _set = function (dateStr) {
          r={};
          var ts = Date.parse(dateStr);
          var d = new Date(ts);
          r.original = dateStr;
          r.full = (d.toString());
          r.local = (d.toLocaleString());
          r.utc = (d.toUTCString());
          r.iso = (d.toISOString());
        };
        for (var i = 0, j = timeElements.length; i < j; i++) {
          _set(timeElements[i].getAttribute('datetime'));
          if ('function' === typeof fn ) fn(timeElements[i],r);
            else timeElements[i].innerHTML = r[this.options.format];
          this.elements.push({
              node: timeElements[i],
              times: r
          });
        }
		return this;
    };
	/**
	 * @method refresh
	 * @access public
	 * @return {Object} Returns ConvertDateTimes for method chaining
	 */
    this.refresh = function(){
        for (var i = 0, j = timeElements.length; i < j; i++) {
          timeElements[i].innerHTML = new Date().toLocaleString();
        }
		return this;
    };
    if ('object' === typeof arg ){
		for (var key in arg) {
			if (arg.hasOwnProperty(key)) {
				if ( key === 'format' ) {
					this.setFormat(arg[key]);
				}
			}
		}
    } else if ('string' === typeof arg ) {
		for (var i = 0, j = allow.length; i < j; i++) {
			if (arg === allow[i]) {
				this.options.format = arg;
			}
		}
    }
	if ('function' === typeof arg ) {
		this.init(arg);
	} else {
		 if ('function' === typeof fn ) {
			this.init(fn);
		} else { 
			this.init();
		}
	}
    return this;
}