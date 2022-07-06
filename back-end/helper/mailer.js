const nodemailer = require("nodemailer");
exports.sendVerifiedEmail = async (email, name, url) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: name,
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#434343"><span>Action requise : Activate your Beautee account</span></div><div style="padding:1rem 0;border-top:1px solid #ffadd2;border-bottom:1px solid #ffadd2;color:#434343;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Beautee. To complete your registration, please confirm your account.</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#ffadd2;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br><div style="padding-top:20px"></div></div>`,
  };
  await transporter.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};

exports.sendResetPassword = async (email, name, url) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: name,
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#434343"><span>Action requise : Reset Password</span></div><div style="padding:1rem 0;border-top:1px solid #ffadd2;border-bottom:1px solid #ffadd2;color:#434343;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">If you forgot your password, please click on this link to reset new password.</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#ffadd2;color:#fff;text-decoration:none;font-weight:600">Reset your password</a><br><div style="padding-top:20px"></div></div>`,
  };
  let info = await transporter.sendMail(mailOptions, (err, res) => {
    if (err) return err;

    return res;
  });
};
