package com.haunc.medpro.Helpers;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

public class SendMail {
    public static void send(String to, String subject, String text) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("med.pro.vn.2022@gmail.com");
        mailSender.setPassword("MedPro@1vn");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        SimpleMailMessage _msg = new SimpleMailMessage();
        _msg.setTo(to);
        _msg.setFrom("no-reply@medpro.ghost");
        _msg.setSubject(subject);
        _msg.setText(text);

        mailSender.send(_msg);
    }
}
