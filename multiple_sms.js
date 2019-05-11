exports.handler = function (context, event, callback) {
    const client = context.getTwilioClient();
    var nums = [event[0], event[1], event[2], event[3]]; //hardcoded for 4 textboxes
    nums.forEach(function (arrayNum) {
        client.messages.create({
            to: arrayNum,
            from: "REPLACE-WITH-YOUR-TWILIO-NUMBER",
            body: "REPLACE WITH YOUR MESSAGE/WHATEVER MESSAGE YOU WANT!"
        }).then(msg => {
            callback(null, msg.sid);
        }).catch(err => callback(err));
    });
};