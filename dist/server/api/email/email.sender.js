'use strict';

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('3fR1_AetJCiZ-fW1ue1CJQ');


exports.send = function(req, res){
	var message = {
	  "html": "<p>Example HTML content</p>",
	  "text": "Example text content",
	  "subject": "example subject",
	  "from_email": "msnwangping@hotmail.com",
	  "from_name": "Example Name",
	  "to": [{
	          "email": "peterwangsmail@gmail.com",
	          "name": "Recipient Name",
	          "type": "to"
	      }],
	  "headers": {
	      "Reply-To": "msnwangping@hotmail.com"
	  },
	  "important": false,
	  "track_opens": null,
	  "track_clicks": null,
	  "auto_text": null,
	  "auto_html": null,
	  "inline_css": null,
	  "url_strip_qs": null,
	  "preserve_recipients": null,
	  "view_content_link": null,
	  "tracking_domain": null,
	  "signing_domain": null,
	  "return_path_domain": null,
	  "merge": true,
	  "merge_language": "mailchimp"
	};
	var async = false;
	var ip_pool = "Main Pool";
	mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
	  console.log(result);
	  /*
	  [{
	          "email": "recipient.email@example.com",
	          "status": "sent",
	          "reject_reason": "hard-bounce",
	          "_id": "abc123abc123abc123abc123abc123"
	      }]
	  */
	}, function(e) {
	  // Mandrill returns the error as an object with name and message keys
	  console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	  // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
	});
}