/**
 * @class localDateTime
 * @verson 0.1
 * @author Christopher D Langton <chris@codewiz.biz>
 * @classDescription Convert Dates and Times to users local
 * @compatibility:
 *        IE 9+
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
function ConvertDateTimes(fn) {
    var timeElements = document.getElementsByTagName('time');
    this.elements = [];
    this.init = function(fn){
        var r = {};
        var _set = function (dateStr) {
          r.original = dateStr;
          var d = new Date(r.original);
          r.full = (d.toString());
          r.local = (d.toLocaleString());
          r.utc = (d.toUTCString());
          r.iso = (d.toISOString());
        };
        for (var i = 0, j = timeElements.length; i < j; i++) {
          if (Object.keys(r).length > 0) r = {};
          _set(timeElements[i].getAttribute('datetime'));
          if ('function' === typeof fn ) fn(timeElements[i],r);
            else timeElements[i].innerHTML = r.local;
          this.elements.push({
              node: timeElements[i],
              times: r
          });
        }
    };
    this.refresh = function(){
        for (var i = 0, j = timeElements.length; i < j; i++) {
          timeElements[i].innerHTML = new Date().toLocaleString();
        }
    };
    this.init(fn);
    return this;
}