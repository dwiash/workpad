var request = require("request");
var fs = require('fs');


var hubstaff = {
    AppToken    : process.env.hubstaff_app_token,
    Email       : process.env.hubstaff_email,
    Password    : process.env.hubstaff_pass,
    AuthToken   : null,
    UserId      : null
};

var cloudant = {
    Account: process.env.cloudant_account,
    Key: process.env.cloudant_key,
    Password: process.env.cloudant_pass
};

// 01 Auth Hubstaff
function getAuthToken(){
    console.log('getAuthToken called');
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
            console.log(err);
            /*
            body = JSON.parse(body);
            if (res.statusCode == '200') {
                console.log('status 200');
                hubstaff.AuthToken = body.user.auth_token;
                hubstaff.UserId = body.user.id;
                fs.writeFileSync('./auth.token',JSON.stringify(body));
            }else if(res.statusCode == '403'){
                console.log('status 403');
                var bodyObj = JSON.parse(fs.readFileSync('./auth.token', 'utf8'));
                hubstaff.AuthToken = bodyObj.user.auth_token;
                hubstaff.UserId = bodyObj.user.id;
            }else{
                console.log('no status');
            }
            console.log(res.statusCode);
            console.log(hubstaff);
            */
        }
    );
}
console.log('hey');
getAuthToken();




// 02 Connect to Cloudant
/*
var db = require('cloudant')({
    account :cloudant.Account, 
    key     :cloudant.Key, 
    password:cloudant.Password
});
*/



// 03 Get the latest recorded time in Cloudant








// 04 Get the latest un-recorded timesheet from Hubstaff
