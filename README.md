### :point_right: This starter repo has moved to the [ionic-team/starters](https://github.com/ionic-team/starters/tree/master/ionic-angular/official/sidemenu) repo! :point_left:


Login
Registration
Home
List
Details
Side Menu
Notifications
Filter
Profile
Settings

SMS OTP

SMS Receiver plugin for Cordova

cordova plugin add cordova-plugin-sms-receiver --save

SmsReceiver.isSupported((supported) => {
  	if (supported) {
    	alert("SMS supported!");

	  	SmsReceiver.startReception(({messageBody, originatingAddress}) => {
		  	alert(messageBody);

		  	SmsReceiver.stopReception(() => {
			  alert("Correctly stopped");
			}, () => {
			  alert("Error while stopping the SMS receiver");
			});

		}, () => {
		  	alert("Error while receiving messages");
		});

  	} else {
    	alert("SMS not supported");
  	}

}), function() => {
 	alert("Error while checking the SMS support");
});


ionic cordova plugin add cordova-plugin-android-permissions

npm install --save @ionic-native/android-permissions

http://www.programmingworldtech.com/2017/09/ionic-3-cordova-read-sms-plugin.html

https://ampersandacademy.com/tutorials/ionic-framework-3/automate-sms-otp-verification-using-ionic3-with-nexmo-part1

javascript video conference
https://github.com/sinch/js-video-calling

https://www.pubnub.com/blog/2015-08-25-webrtc-video-chat-app-in-20-lines-of-javascript/

https://www.sitepoint.com/webrtc-video-chat-application-simplewebrtc/

https://www.scaledrone.com/blog/webrtc-tutorial-simple-video-chat/

Push Notification Automate Using PHP
https://ampersandacademy.com/tutorials/ionic-framework-version-2/push-notification-automate-using-php

Ionic App - Health Centre List from Ampersand Academy
https://ampersandacademy.com/tutorials/ionic-framework-version-2/ionic-app-health-centre-list-from-ampersand-academy