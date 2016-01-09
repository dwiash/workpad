var request = require("request");
var fs = require('fs');
var sqlite = require('sqlite3');


var hubstaff = {
    AppToken    : process.env.hubstaff_app_token,
    Email       : process.env.hubstaff_email,
    Password    : process.env.hubstaff_pass,
    AuthToken   : null,
    UserId      : null
};


// 01 Auth Hubstaff
function getAuthToken(){
    request.post(
        {
            url:'https://api.hubstaff.com/v1/auth',
            headers: {'App-Token': hubstaff.AppToken},
            form:{
                email: hubstaff.Email,
                password: hubstaff.Password
            }
        },
        function(err, res, body){
			//switch(err){
				//case 'case':
					//break;
			//}
			console.log(arguments);
            if (res.statusCode == '200') {
				body = JSON.parse(body);
                hubstaff.AuthToken = body.user.auth_token;
                hubstaff.UserId = body.user.id;
                fs.writeFileSync('./auth.token',JSON.stringify(body));
            }else if(res.statusCode == '403'){
				body = JSON.parse(body);
                var bodyObj = JSON.parse(fs.readFileSync('./auth.token', 'utf8'));
                hubstaff.AuthToken = bodyObj.user.auth_token;
                hubstaff.UserId = bodyObj.user.id;
            }else{
                console.log('no status');
            }
			console.log(hubstaff.AuthToken);
			console.log(hubstaff.UserId);
        }
    );
}
getAuthToken();




// 02 Connect to SQLite DB
// if not exist, create a new db file

//var db = new sqlite.Database('./db');
//db.serialize(function() {
	//db.run("CREATE TABLE lorem (info TEXT)", function(){
		//console.log(arguments);
	//});

	//var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
	//for (var i = 0; i < 10; i++) {
		//stmt.run("Ipsum " + i);
	//}
	//stmt.finalize();

	//db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
		//console.log(row.id + ": " + row.info);
	//});
//});

//db.close();








// 03 Get the latest recorded time in Cloudant








// 04 Get the latest un-recorded timesheet from Hubstaff
