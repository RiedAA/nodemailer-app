
const express = require("express");

const path =require('path');

const router = express.Router();

const cors = require("cors");

const nodemailer = require("nodemailer");

require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);



//here we create a transport function as below 
const transporter = nodemailer.createTransport({
  service: 'hotmail',   // You'r mail server in my case i have hotmail
  auth: {
    user: process.env.Mail_User,  // mail you want nodemailer to send mailes with example@hotmail.com  
    pass: process.env.Mail_Password         // password of example@hotmail.com in my case! 
  }
});

// post call that gets the data from frontend on ***** /contact-form ***** endpoint and build email object!
router.post("/contact-form", (req, res) => {
    const name = req.body.firstName + " "+ req.body.lastName; // get name value from frontend/contact-form
    const email = req.body.email;                             // get mail value from frontend/contact-form
    const message = req.body.message;                         // get message value from frontend/contact-form
    const mail = {
      from:'example@hotmail.com' , //again we pass where this mail is coming from  into mail object
      to: "targetMail@outlook.de", // now here we can pass more than one inbox feel free to do it !
      subject: "Contact Message from my-website.com", // Mail Subject, it takes a string 
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`, // last html body of our mail includes the values i am getting from contact Form!
    };
    

    // send mail :)
    transporter.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "failed" });
      } else {
        res.json({ status: "sent" });
      }
    });
  });


app.listen(process.env.PORT || 3003, () => console.log("Server Running"));