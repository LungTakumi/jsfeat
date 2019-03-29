/**
* this code is from all around the web :)
* if u want to put some credits u are welcome!
*/
var compatibility = (function() {
        var lastTime = 0,
        isLittleEndian = true,

        URL = window.URL || window.webkitURL,

        requestAnimationFrame = function(callback, element) {
            var requestAnimationFrame =
                window.requestAnimationFrame        || 
                window.webkitRequestAnimationFrame  || 
                window.mozRequestAnimationFrame     || 
                window.oRequestAnimationFrame       ||
                window.msRequestAnimationFrame      ||
                function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

            return requestAnimationFrame.call(window, callback, element);
        },

        cancelAnimationFrame = function(id) {
            var cancelAnimationFrame = window.cancelAnimationFrame ||
                                        function(id) {
                                            clearTimeout(id);
                                        };
            return cancelAnimationFrame.call(window, id);
        },

        getUserMedia = async function(options, success, error) {
			try{
				const stream = await navigator.mediaDevices.getUserMedia(options);
				const videoTracks = stream.getVideoTracks();
				console.log('Got stream.');
				console.log(`Using video device: ${videoTracks[0].label}`);
				window.stream = stream;
				success(stream);
			}catch(e){
				error(e);
			}
        },

        detectEndian = function() {
            var buf = new ArrayBuffer(8);
            var data = new Uint32Array(buf);
            data[0] = 0xff000000;
            isLittleEndian = true;
            if (buf[0] === 0xff) {
                isLittleEndian = false;
            }
            return isLittleEndian;
        };

    return {
        URL: URL,
        requestAnimationFrame: requestAnimationFrame,
        cancelAnimationFrame: cancelAnimationFrame,
        getUserMedia: getUserMedia,
        detectEndian: detectEndian,
        isLittleEndian: isLittleEndian
    };
})();