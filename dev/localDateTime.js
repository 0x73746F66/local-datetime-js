/**
 * @class localDateTime
 * @verson 0.4
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
'use strict';
var ConvertDateTimes = function(arg,fn) {
	try{
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
			format: 'local',
			enableTitle: true,
			titleFormat: 'full',
			allow: ['milliseconds','full','local','utc','iso','time','time12','time24']
		};
		/**
		 * @property timezoneOffset
		 * @type {Integer}
		 * @access public
		 */
		this.timezoneOffset = (new Date()).getTimezoneOffset() / 60;
		// Initialization
		if ('object' === typeof arg ){
			for (var key in arg) {
				if (arg.hasOwnProperty(key)) {
					if ( key === 'format' ) {
						this.defaultFormat(arg[key]);
					}
					if ( key === 'enableTitle' ) {
						this.enableTitle(arg[key]);
					}
					if ( key === 'titleFormat' ) {
						this.titleFormat(arg[key]);
					}
				}
			}
		} else if ('string' === typeof arg ) {
			this.defaultFormat(arg);
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
	} catch (err) {
		this.errors.push({
			datetime: (new Date()).toLocaleString(),
			type: err.name,
			message: err.message
		});
		return true;
	}
};
// Instance methods
ConvertDateTimes.fn = ConvertDateTimes.prototype = {
	/**
	 * @method init
	 * @param {Function} fn Callback function
	 * @access public
	 * @return {Object} Returns ConvertDateTimes for method chaining
	 */
    init: function(fn){
		this.errors = [];
		try{
			/**
			 * @property timeElements
			 * @type {Array}
			 * @access private
			 */
			var timeElements = document.getElementsByTagName('time');
			/**
			 * @property tempDateObj implements and extends JavaScript Date object methods
			 * @type {Object}
			 * @access private
			 */
			var tempDateObj = function(){
				return {
					getDate: function(){
						return ( new Date( this.milliseconds ) ).getDate();
					},
					getDay: function(){
						return ( new Date( this.milliseconds ) ).getDay();
					},
					getFullYear: function(){
						return ( new Date( this.milliseconds ) ).getFullYear();
					},
					getHours: function(){
						return ( new Date( this.milliseconds ) ).getHours();
					},
					getMilliseconds: function(){
						return ( new Date( this.milliseconds ) ).getMilliseconds();
					},
					getMinutes: function(){
						return ( new Date( this.milliseconds ) ).getMinutes();
					},
					getMonth: function(){
						return ( new Date( this.milliseconds ) ).getMonth();
					},
					getSeconds: function(){
						return ( new Date( this.milliseconds ) ).getSeconds();
					},
					getTime: function(){
						return ( new Date( this.milliseconds ) ).getTime();
					},
					getTimezoneOffset: function(){
						return ( new Date( this.milliseconds ) ).getTimezoneOffset();
					},
					getUTCDate: function(){
						return ( new Date( this.milliseconds ) ).getUTCDate();
					},
					getUTCDay: function(){
						return ( new Date( this.milliseconds ) ).getUTCDay();
					},
					getUTCFullYear: function(){
						return ( new Date( this.milliseconds ) ).getUTCFullYear();
					},
					getUTCHours: function(){
						return ( new Date( this.milliseconds ) ).getUTCHours();
					},
					getUTCMilliseconds: function(){
						return ( new Date( this.milliseconds ) ).getUTCMilliseconds();
					},
					getUTCMinutes: function(){
						return ( new Date( this.milliseconds ) ).getUTCMinutes();
					},
					getUTCMonth: function(){
						return ( new Date( this.milliseconds ) ).getUTCMonth();
					},
					getUTCSeconds: function(){
						return ( new Date( this.milliseconds ) ).getUTCSeconds();
					},
					toString: function(){
						return ( new Date( this.milliseconds ) ).toString();
					},
					toLocaleString: function(){
						return ( new Date( this.milliseconds ) ).toLocaleString();
					},
					toUTCString: function(){
						return ( new Date( this.milliseconds ) ).toUTCString();
					},
					toISOString: function(){
						return ( new Date( this.milliseconds ) ).toISOString();
					},
					toTimeString: function(){
						return ( new Date( this.milliseconds ) ).toTimeString();
					},
					DAYNAMES: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
					MONTHNAMES: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					getFullDay: function() {
					  return this.DAYNAMES[this.getDay()];
					},
					getDayAbbr: function() {
					  return this.getFullDay().slice(0, 3);
					},
					getFullMonth: function() {
					  return this.MONTHNAMES[this.getMonth()];
					},
					getMonthAbbr: function() {
					  return this.getFullMonth().slice(0, 3);
					},
					to12HourTimeString: function () {
					  var h = this.getHours();
					  var m = "0" + this.getMinutes();
					  var s = "0" + this.getSeconds();
					  var ap = "am";
					  if (h >= 12) {
						ap = "pm";
						if (h >= 13){
						  h -= 12;
						}
					  } else if (h == 0){
						h = 12;
					  }
					  h = "0" + h;
					  return h.slice(-2) + ":" +
						m.slice(-2) + ":" +
						s.slice(-2) + " " + ap;
					},
					to24HourTimeString: function () {
					  var h = "0" + this.getHours();
					  var m = "0" + this.getMinutes();
					  var s = "0" + this.getSeconds();
					  return h.slice(-2) + ":" + m.slice(-2) + ":" + s.slice(-2);
					},
					lastday: function() {
					  var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
					  return d.getDate();
					},
					full: function(){ return this.toString(); },
					local: function(){ return this.toLocaleString(); },
					utc: function(){ return this.toUTCString(); },
					iso: function(){ return this.toISOString(); },
					time: function(){ return this.toTimeString(); },
					time12: function(){ return this.to12HourTimeString(); },
					time24: function(){ return this.to24HourTimeString(); }
				};
			};
			var dateObj = new tempDateObj();
			var nowObj = new tempDateObj();
			var _set = function (dateStr) {
			  dateObj.milliseconds = Date.parse( dateStr );
			  nowObj.milliseconds = Date.now();
			};
			if (this.elements.length > 0) this.elements = [];
			for (var i = 0, j = timeElements.length; i < j; i++) {
			  _set(timeElements[i].getAttribute('datetime'));
			  if ('function' === typeof fn ) {
				fn(timeElements[i],dateObj,nowObj);
			  } else if ( timeElements[i].hasAttribute("data-bind") ) {
				eval('var data='+timeElements[i].getAttribute("data-bind"));
				if ( 'object' === typeof data && 'undefined' !== typeof data.format && this.isValidFormat(data.format) ) {
					timeElements[i].innerHTML = dateObj[data.format]();
				} else {
					timeElements[i].innerHTML = dateObj[this.options.format]();
				}
				if ( true === this.options.enableTitle ) {
					if ( 'object' === typeof data && 'undefined' !== typeof data.titleFormat && this.isValidFormat(data.titleFormat) ) {
						timeElements[i].title = dateObj[data.titleFormat]();
					} else {
						timeElements[i].title = dateObj[this.options.titleFormat]();
					}
				}
			  } else {
				timeElements[i].innerHTML = dateObj[this.options.format]();
				if ( true === this.options.enableTitle ) {
					timeElements[i].title = dateObj[this.options.titleFormat]();
				}
			  }
			  this.elements.push({
				  node: timeElements[i],
				  times: dateObj,
				  now: nowObj
			  });
			}
		} catch (err) {
			this.errors.push({
				datetime: (new Date()).toLocaleString(),
				type: err.name,
				message: err.message
			});
			return true;
		}
		return this;
    },
    isValidFormat: function(format){
		for (var i = 0, j = this.options.allow.length; i < j; i++)
        if (format === this.options.allow[i]) return true;
		return false;
	},
    defaultFormat: function(format){
		if ( 'undefined' === typeof format ) return this.options.format;
		if ( this.isValidFormat(format) ) this.options.format = format;
		return this;
	},
    titleFormat: function(format){
		if ( 'undefined' === typeof format ) return this.options.titleFormat;
		if ( this.isValidFormat(format) ) this.options.titleFormat = format;
		return this;
	},
    enableTitle: function(opt){
		if ( 'undefined' === typeof opt ) return this.options.enableTitle;
        if ( 'boolean' === typeof opt ) this.options.enableTitle = opt;
		return this;
	},
	/**
	 * @method getTimeZoneOffsetInHours
	 * @access public
	 * @return {Integer} Returns Users Current Time Zone Offset In Hours
	 */
    getTimeZoneOffsetInHours: function(){
		return this.timezoneOffset;
	},
	/**
	 * @method refresh
	 * @access public
	 * @return {Object} Returns ConvertDateTimes for method chaining
	 */
    refresh: function(){
		try{
			for (var i = 0, j = this.elements.length; i < j; i++) {
				this.elements[i].now.milliseconds = Date.now();
				if ( this.elements[i].node.hasAttribute("data-bind") ) {
					eval('var data='+this.elements[i].node.getAttribute("data-bind"));
					if ( 'object' === typeof data && 'undefined' !== typeof data.format && this.isValidFormat(data.format) ) {
						this.elements[i].node.innerHTML = dateObj[data.format]();
					} else {
						this.elements[i].node.innerHTML = dateObj[this.options.format]();
					}
					if ( true === this.options.enableTitle ) {
						if ( 'object' === typeof data && 'undefined' !== typeof data.titleFormat && this.isValidFormat(data.titleFormat) ) {
							this.elements[i].node.title = dateObj[data.titleFormat]();
						} else {
							this.elements[i].node.title = dateObj[this.options.titleFormat]();
						}
					}
				} else {
					this.elements[i].node.innerHTML = this.elements[i].now[this.options.format]();
					if ( true === this.options.enableTitle ) {
						this.elements[i].node.title = this.elements[i].now[this.options.titleFormat]();
					}
				}
			}
		} catch (err) {
			this.errors.push({
				datetime: (new Date()).toLocaleString(),
				type: err.name,
				message: err.message
			});
			return true;
		}
		return this;
    }
};
