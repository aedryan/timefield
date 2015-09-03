(function ($) {	
	$.fn.timefield = function() {		
		// Creates the time field
		var date = new Date(),
			ihours = date.getHours(),
			ushours = (ihours > 12 ? ihours -=12 : ihours);
		$(this)
			.append($("<div></div>")
				.addClass("tc-container")
				.append($('<input>')
					.attr({
						maxlength : 2,
						placeholder: "00",
						value: ("0" + ushours).slice(-2)
					})
					.addClass("tc-hours tc-numbers")
				).append("<span>:</span>")
				.append($('<input />')
					.attr({
						maxlength : 2,
						placeholder: "00",
						value: ("0" + date.getMinutes()).slice(-2)
					})
					.addClass("tc-minutes tc-numbers")
				).append("<span>:</span>")
				.append($('<input>')
					.attr({
						maxlength : 2,
						placeholder: "00",
						value: ("0" + date.getSeconds()).slice(-2)
					})
					.addClass("tc-seconds tc-numbers")
				).append($('<input>')
					.attr({
						maxlength : 2,
						placeholder: "AM",
						value: date.getHours().valueOf() > 12 ? "PM" : "AM"
					})
					.addClass("tc-ampm")
				)
			);
		
		// Set the default styles for the elements of the time field
		$(".tc-container").css({
			"border": "1px solid rgb(200,200,200)",
			"background-color": "white",
			"box-shadow": "inset 0 1px 2px rgba(0,0,0,.1)",
			"padding": "1px",
			"display":"inline-block"
		});
		
		$(".tc-container input").css({
			"border": "none",
			"background": "none",
			"width": "20px",
			"padding": "0px",
			"margin": "0px",
			"text-align": "center",
			"font-size": "0.8em",
			"display": "inline-block",
			"cursor": "default",
			"outline": "0"
		});
		
		$(".tc-ampm").css({
			"width": "25px",
		});
		
		// Sets the AM/PM to AM when the user presses A and PM when the user presses P
		$(".tc-AMPM").on("keydown",function(e){
			switch (e.keyCode) {
				case 65:
					$(this).val("AM");
					break
				case 80:
					$(this).val("PM");
					break
			}
		});
		
		// This automatically selects the text for hours, minutes, or AM/PM when the user clicks on it
		$(".tc-container input").on("click", function () {
			$(this).select();
		});
		
		// Doesn't allow anything but numbers
		$(".tc-numbers").on("keypress",function(evt) {
			var charCode = (evt.which) ? evt.which : event.keyCode;
			if (charCode > 31 && (charCode < 48 || charCode > 57))
				{ return false; }
			else 
				{ return true; }
		});
		
		// Clones the original times for usage in the next to functions
		var OGminute	= $(".tc-minutes").clone().val();
		var OGhour		= $(".tc-hours").clone().val();
		var OGsecond	= $(".tc-seconds").clone().val();

		// Function to check valid values
		function checkFields(expectedValue,OGValue){
			var value = $(this).val();
			if ( 
				value > expectedValue
			) {
				$(this).effect( "highlight", { 
					color: "rgba(255,180,180)", 
					complete: function(){
						$(this).select();
					}
				}, 500 );
				$(".tc-container").effect( "shake", {distance: 3, times: 2}, 250 );
				$(this).val(OGValue);
			} 
			else {
				OGValue = $(this).val();
			}
		}
		
		// This checks to see if the seconds, minutes, and hours are in the right range, if not it discards it for the last valid value entered, if so it saves the value for the next time an invalid value is entered
		$(".tc-seconds").on("keyup",checkFields(60,OGsecond));
		$(".tc-minutes").on("keyup",checkFields(60,OGminute));
		$(".tc-hours").on("keyup",checkFields(12,OGhour));
		
		// This adds leading zeroes to the hours and minutes when the user types a single digit
		$(".tc-numbers").on("blur",function(){
			$(this).val(function(i, txt) {
				return txt.replace(/^\d$/, '0$&');
			});
		});
		
		// Auto-advance after 2 characters are entered
		$(".tc-numbers").on("focus",function(){
			var oldVal = $(this).val(),
				inputs = $(".tc-container input");
			$(this).on("keyup",function(){
				if (
					$(this).val() != oldVal && $(this).val().length == 2
				) {
					inputs[inputs.index(this)+1].select();
					oldVal = $(this).val();
				}
			});
		});
	}
}(jQuery));
