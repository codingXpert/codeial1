const nodeMailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

let transporter = nodeMailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'keshavjha2302@gmail.com',
        pass:'ubvsiqwgbjsrriwx'
    }
});

let renderTemplate = (data, relativePath) => {
    let mainHTML;
    ejs.renderFile(path.join(__dirname, '../views/mailers', relativePath), data, function(err, template){
        if(err) {
            console.log('Error in rendering template : ' + err);
            return;
        }
        mainHTML = template;
    })
    return mainHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate: renderTemplate
};