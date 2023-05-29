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

module.exports.sendEmail = (fullName, email, password, emailE) => {
  transport
    .sendMail({
      from: 'my.schooletest123@gmail.com',
      to: email,
      subject: 'Confirmation de création de compte',
      html: `
        <h1> Cher(e) ${fullName}</h1>
        <h3>Votre compte a été créé avec succès. Voici les détails :        </h3>
        <p>Votre email :${emailE}</p>
        <p>Votre mot de passe   :${password}</p>
        <p>Pour toute question, contactez-nous à myschoolteam@support.tn .</p>
       <p>Cordialement, <br>
       L'équipe de MySchool.tn
       </p> 
        </div>`,
    })
    .catch((err) => console.log(err));
};
