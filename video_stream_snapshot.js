/**
 * @author Ralf-Juergen Triebel - Hamburg / Germany
 *
 ***** Capture images from videostream *****
 *     using jQuery©
 */

/**
 * Initialize when specific page is shown
 */

$('#pageScan').live('pageshow', function(event) {

	var video = document.querySelector("#screenshotstream");
	var button = document.querySelector('#screenshotbutton');
	var canvas = document.querySelector('#screenshotcanvas');
	var img = document.querySelector('#screenshot');
	var ctx = canvas.getContext('2d');
	var localMediaStream = null;

	/**
	 * Check if browser supports getUserMedia()
	 * and if user allows access to the camera
	 */

	checkGetUserMedia();

	function checkGetUserMedia() {

		if (localMediaStream)

			if (localMediaStream) {
				snapshot();
				return;
			}

		if (navigator.getUserMedia) {
			navigator.getUserMedia('video', function(stream) {
				video.src = stream;
				localMediaStream = stream;
				sizeCanvas();
			}, onError);

		} else if (navigator.webkitGetUserMedia) {
			navigator.webkitGetUserMedia({
				video : true
			}, function(stream) {
				video.src = window.webkitURL.createObjectURL(stream);
				localMediaStream = stream;
				sizeCanvas();
			}, onError);

		} else {
			onError({
				target : video
			});
		}

	}

	/**
	 * Bind event for snaphot-button
	 */
	$("#screenshotbutton").click(function() {
		sizeCanvas();
		snapshot();
	});

	/**
	 * Set the canvas dimensions first due to jQuerys damn default css
	 * min-width and height for that element!
	 */
	function sizeCanvas() {
		canvas.width = video.width;
		canvas.height = (video.height - 50 );
	}

	/**
	 * Draw VideoFrame on Canvas
	 */

	function snapshot() {
		ctx.drawImage(video, 0, 0, video.width, (video.height - 50 ));
		img.src = canvas.toDataURL('image/webp');
	}

	/**
	 * Errorhandling
	 */

	function onError(e) {
		if (e.code == 1) {
			alert('User denied access to their camera');
		} else {
			alert('getUserMedia() not supported in your browser.');
		}
	}

}); 