require("dotenv").config();
import nodemailer from "nodemailer";

let checkEmailLanguage = (inputData) => {
  let bodyEmail = "";
  if (inputData.language === "vi") {
    bodyEmail = `<h3>Xin Chào ${inputData.name} !</h3>
      <div>Bạn đã đặt lịch khám bệnh thành công trên nền tảng <b>Booking Care</b>.</div>
      <div>Thông tin đặt lịch khám bệnh:</div>
      <h5>Thời gian: ${inputData.date} &nbsp; ${inputData.time}</h5>
      <h5>Bác sĩ: ${inputData.doctorName} </h5>
      <p>Nếu các thông tin trên chính xác, vui lòng bấm vào đường link bên dưới để hoàn tất xác nhận đặt lịch khám bệnh.</p>
    <a href=${inputData.urlLink}>Xác nhận</a>
    <p>Xin chân thành cảm ơn.</p>`;
  } else {
    bodyEmail = `<h3>Hello ${inputData.name}!</h3>
    <div>You have successfully booked a medical appointment on the <b>Booking Care</b> platform.</div>
    <div>Appointment details:</div>
    <h5>Time: ${inputData.date} &nbsp; ${inputData.time}</h5>
    <h5>Doctor: ${inputData.doctorName}</h5>
    <p>If the above information is correct, please click the link below to confirm your appointment.</p>
    <a href="${inputData.urlLink}">Confirm</a>
    <p>Thank you very much.</p>`;
  }
  return bodyEmail;
};
let sendEmailBooking = async (inputData) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: '"Booking care" <huy.nguyenquangk21ce@hcmut.edu.vn>', // sender address
    to: inputData.email, // list of receivers
    subject: "Booking Care Confirm Email ♥", // Subject line
    html: checkEmailLanguage(inputData),
  });
};

module.exports = {
  sendEmailBooking: sendEmailBooking,
};
