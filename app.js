const express = require('express');
const app = express();
const http = require('http');

app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.post('/phone', (req,res) => {

    let { hp } = req.body;
    //Where g means to search, that is, if you are searching for -, replace it with a space.
    let hp_regex = hp.replace(/\-/g, "");
    res.send(`Value stored in DB : ${hp}\n Regex filter value :  ${hp_regex}`);
});

app.post('/phone_check', (req, res) => {

    let { hp } = req.body;
    // \d means 0~9, the beginning of the string ^. However, if you enter it in [], you can know the meaning of not.
    // $ Means the end of the string, test returns true if the expression is correct, or false.
    let filterhp = hp.replace(/\-/g, "");
    let check_regex = /^01([\d]{1}?)[\d]{7,8}$/.test(filterhp);
    if(check_regex){
        res.send('The mobile phone form is correct.');
    }else {
        res.send('The cell phone form is not correct.');
    }
})

app.post('/email_check', (req, res) => {

    let { email } = req.body;
    let emailfilter = email.split('@')[0];
    // gi checks for the condition.
    let check_regex = /[^A-Za-z0-9]/gi.test(emailfilter);
    if(!check_regex){
        res.send(`The email form is correct. Email entered:${email}`);
    }else{
        res.send(`The email form is not correct. Email entered:${email}`);
    }
})


http.createServer(app).listen(8081, () => {
    console.log('server on');
});