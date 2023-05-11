const nodemailer = require('nodemailer');
const config = require('./auth.config');

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'my.schooletest123@gmail.com',
    pass: 'pgqprlaqqpsczhoh',
  },
});

module.exports.sendEmail = (fullName, email, password) => {
  transport
    .sendMail({
      from: 'my.schooletest123@gmail.com',
      to: email,
      subject: 'Votre compte',
      html: `<h1>Email Confirmation</h1>
        <h2> Bienvenu ${fullName}</h2>
        <p>Email :${email}</p>
        <p>Pasword :${password}</p>
    
        </div>`,
    })
    .catch((err) => console.log(err));
};
