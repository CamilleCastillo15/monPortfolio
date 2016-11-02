$(document).ready(function() {

	// $('.simple-ajax-popup-align-top').magnificPopup({
	// 	type: 'ajax',
	// 	alignTop: true,
	// 	overflowY: 'scroll' 
	// });

	$('.simple-ajax-popup').magnificPopup({
		// delegate:'a',
		type: 'ajax',
		callbacks: {
		  parseAjax: function(mfpResponse) {
		    // mfpResponse.data is a "data" object from ajax "success" callback
		    // for simple HTML file, it will be just String
		    // You may modify it to change contents of the popup
		    // For example, to show just #some-element:
		    // mfpResponse.data = $(mfpResponse.data).find('#some-element');

		    // mfpResponse.data must be a String or a DOM (jQuery) element

		    console.log('Ajax content loaded:', mfpResponse);
		  },
		  ajaxContentAdded: function() {
		    // Ajax content is loaded and appended to DOM
		    console.log(this.content);
		  }
		}
	});

	
});