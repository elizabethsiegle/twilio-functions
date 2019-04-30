 let memory = JSON.parse(event.Memory);
    let event_name = memory.twilio.collected_data.event_sponsorship.answers.event_name.answer || 'event name';
    let devangel_name = memory.twilio.collected_data.event_sponsorship.answers.devangel_name.answer || 'not sure';
    let user_email = memory.twilio.collected_data.event_sponsorship.answers.user_email.answer;
    let event_website = memory.twilio.collected_data.event_sponsorship.answers.event_website.answer;
    let event_start_date = memory.twilio.collected_data.event_sponsorship.answers.event_start_date.answer;
    let event_end_date = memory.twilio.collected_data.event_sponsorship.answers.event_end_date.answer;
    let anticipated_devs_num = memory.twilio.collected_data.event_sponsorship.answers.anticipated_devs_num.answer;
    let alcohol = memory.twilio.collected_data.event_sponsorship.answers.alcohol.answer;
    let event_prospectus_link = memory.twilio.collected_data.event_sponsorship.answers.event_prospectus_link.answer;
    let event_location = memory.twilio.collected_data.event_sponsorship.answers.event_location.answer;
    console.log("event_name ", event_name, "devangel_name ", devangel_name, "user_email ", user_email, "event_website ", event_website
    , "event_prospectus_link ", event_prospectus_link, "event_location ", event_location, 
    "event_start_date ", event_start_date, "event_end_date ", event_end_date, "anticipated_devs_num ", anticipated_devs_num, "alcohol ", alcohol);
    const MongoClient = require('mongodb').MongoClient;
    const uri = context.MONGO_COMPASS_CONNECTION_STRING;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    MongoClient.connect(uri, function(err, db){
        if (err) console.log("err");
        var dbo = db.db("events");
        var eventObj = {
            "event_name ": event_name, 
            "devangel_name ": devangel_name,
            "user_email ": user_email, 
            "event_website ": event_website,
            "event_prospectus_link ": event_prospectus_link,
            "event_location ": event_location,
            "event_start_date ": event_start_date, 
            "event_end_date ": event_end_date, 
            "anticipated_devs_num ": anticipated_devs_num, 
            "alcohol ": alcohol
        }
        dbo.collection("events_list").insertOne(eventObj, function(err, res) {
            if (err) console.log("err");
            console.log("1 doc inserted");
            db.close();
        });
        
        const response =  { actions: [{
            say: "Got the input for " + event_name + "!" 
        }]};
        callback(null, response);
    });
