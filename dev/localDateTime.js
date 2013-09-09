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
'use strict';
var ConvertDateTimes = function(arg,fn) {
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
		format:	'local',
		allow: ['original','full','local','utc','iso','time','time12','time24']
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
					this.setFormat(arg[key]);
				}
			}
		}
    } else if ('string' === typeof arg ) {
		for (var i = 0, j = this.options.allow.length; i < j; i++) {
			if (arg === this.options.allow[i]) {
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
        var tempDateObj = {
			getDate: function(){
				return ( new Date( Date.parse( this.original ) ) ).getDate();
			},
			getDay: function(){
				return ( new Date( Date.parse( this.original ) ) ).getDay();
			},
			getFullYear: function(){
				return ( new Date( Date.parse( this.original ) ) ).getFullYear();
			},
			getHours: function(){
				return ( new Date( Date.parse( this.original ) ) ).getHours();
			},
			getMilliseconds: function(){
				return ( new Date( Date.parse( this.original ) ) ).getMilliseconds();
			},
			getMinutes: function(){
				return ( new Date( Date.parse( this.original ) ) ).getMinutes();
			},
			getMonth: function(){
				return ( new Date( Date.parse( this.original ) ) ).getMonth();
			},
			getSeconds: function(){
				return ( new Date( Date.parse( this.original ) ) ).getSeconds();
			},
			getTime: function(){
				return ( new Date( Date.parse( this.original ) ) ).getTime();
			},
			getTimezoneOffset: function(){
				return ( new Date( Date.parse( this.original ) ) ).getTimezoneOffset();
			},
			getUTCDate: function(){
				return ( new Date( Date.parse( this.original ) ) ).getUTCDate();
			},
			getUTCDay: function(){
				return ( new Date( Date.parse( this.original ) ) ).getUTCDay();
			},
			getUTCFullYear: function(){
				return ( new Date( Date.parse( this.original ) ) ).getUTCFullYear();
			},
			getUTCHours: function(){
				return ( new Date( Date.parse( this.original ) ) ).getUTCHours();
			},
			getUTCMilliseconds: function(){
				return ( new Date( Date.parse( this.original ) ) ).getUTCMilliseconds();
			},
			getUTCMinutes: function(){
				return ( new Date( Date.parse( this.original ) ) ).getUTCMinutes();
			},
			getUTCMonth: function(){
				return ( new Date( Date.parse( this.original ) ) ).getUTCMonth();
			},
			getUTCSeconds: function(){
				return ( new Date( Date.parse( this.original ) ) ).getUTCSeconds();
			},
			toString: function(){
				return ( new Date( Date.parse( this.original ) ) ).toString();
			},
			toLocaleString: function(){
				return ( new Date( Date.parse( this.original ) ) ).toLocaleString();
			},
			toUTCString: function(){
				return ( new Date( Date.parse( this.original ) ) ).toUTCString();
			},
			toISOString: function(){
				return ( new Date( Date.parse( this.original ) ) ).toISOString();
			},
			toTimeString: function(){
				return ( new Date( Date.parse( this.original ) ) ).toTimeString();
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
			}
	    };
        var _set = function (dateStr) {
          tempDateObj.original = dateStr;
          tempDateObj.full = (tempDateObj.toString());
          tempDateObj.local = (tempDateObj.toLocaleString());
          tempDateObj.utc = (tempDateObj.toUTCString());
          tempDateObj.iso = (tempDateObj.toISOString());
		  tempDateObj.time = (tempDateObj.toTimeString());
		  tempDateObj.time12 = (tempDateObj.to12HourTimeString());
		  tempDateObj.time24 = (tempDateObj.to24HourTimeString());
        };
		if (this.elements.length > 0) this.elements = [];
        for (var i = 0, j = timeElements.length; i < j; i++) {
          _set(timeElements[i].getAttribute('datetime'));
          if ('function' === typeof fn ) fn(timeElements[i],tempDateObj);
            else timeElements[i].innerHTML = tempDateObj[this.options.format];
          this.elements.push({
              node: timeElements[i],
              times: tempDateObj
          });
        }
		return this;
    },
	/**
	 * @method setFormat
	 * @param {String} format A default date and time render type, use one of ['original','full','local','utc','iso']
	 * @access public
	 * @return {Object} Returns ConvertDateTimes for method chaining
	 */
    setFormat: function(format){
		for (var i = 0, j = this.options.allow.length; i < j; i++)
        if (format === this.options.allow[i]) this.options.format = format;
		return this;
	},
	/**
	 * @method getFormat
	 * @access public
	 * @return {String} Returns Default date and time format used by this class
	 */
    getFormat: function(){
		return this.options.format;
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
		var to12HourTimeString = function (dateTime) {
		  var h = dateTime.getHours();
		  var m = "0" + dateTime.getMinutes();
		  var s = "0" + dateTime.getSeconds();
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
		};
		var to24HourTimeString = function (dateTime) {
		  var h = "0" + dateTime.getHours();
		  var m = "0" + dateTime.getMinutes();
		  var s = "0" + dateTime.getSeconds();
		  return h.slice(-2) + ":" + m.slice(-2) + ":" + s.slice(-2);
		};
		var dateTimeStr;
		var dateTime = new Date();
		if ( this.options.format === "full" ) {
			dateTimeStr = dateTime.toString();
		} else if ( this.options.format === "local" ) {
			dateTimeStr = dateTime.toLocaleString();
		} else if ( this.options.format === "utc" ) {
			dateTimeStr = dateTime.toUTCString();
		} else if ( this.options.format === "iso" ) {
			dateTimeStr = dateTime.toISOString();
		} else if ( this.options.format === "time" ) {
			dateTimeStr = dateTime.toTimeString();
		} else if ( this.options.format === "time12" ) {
			dateTimeStr = to12HourTimeString(dateTime);
		} else if ( this.options.format === "time24" ) {
			dateTimeStr = to24HourTimeString(dateTime);
		} else {
			dateTimeStr = dateTime.toLocaleString();
		}
        for (var i = 0, j = this.elements.length; i < j; i++) {
          this.elements[i].node.innerHTML = dateTimeStr;
        }
		return this;
    }
};
