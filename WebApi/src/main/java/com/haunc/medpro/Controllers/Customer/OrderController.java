package com.haunc.medpro.Controllers.Customer;

import com.haunc.medpro.Forms.OrderFormData;
import com.haunc.medpro.Helpers.SendMail;
import com.haunc.medpro.Models.Order;
import com.haunc.medpro.Enums.OrderGender;
import com.haunc.medpro.Repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.bind.annotation.*;
import org.springframework.mail.SimpleMailMessage;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Properties;

@RestController()
@CrossOrigin
@RequestMapping(path = "/customer/departments")
public class OrderController {

    @Autowired
    public OrderRepository orderRepository;

    @PostMapping("/{did}/doctors/{id}/orders")
    public HashMap<String, Object> store(@PathVariable("id") Integer id, @RequestBody OrderFormData formData) {
        HashMap<String, Object> _json = new HashMap<>();

        Order order = new Order();

        order.setFullName(formData.getFullName());
        order.setPhoneNumber(formData.getPhoneNumber());
        order.setEmail(formData.getEmail());
        order.setIdCard(formData.getIdCard());

        try {
            SimpleDateFormat _sdf = new SimpleDateFormat("yyyy-MM-dd");

            order.setBirthday(_sdf.parse(formData.getBirthday()));
        } catch (ParseException e) {
            e.printStackTrace();

            _json.put("success", false);
            _json.put("message", "Ngày sinh không hợp lệ.");

            return _json;
        }

        switch (formData.getGender()) {
            case "MALE":
                order.setGender(OrderGender.MALE);
                break;
            case "FEMALE":
                order.setGender(OrderGender.FEMALE);
                break;
            default:
                order.setGender(OrderGender.UNKNOWN);
        }

        try {
            SimpleDateFormat _sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            order.setScheduleAt(_sdf.parse(formData.getScheduleAt()));
        } catch (ParseException e) {
            e.printStackTrace();

            _json.put("success", false);
            _json.put("message", "Ngày đặt lịch không hợp lệ.");

            return _json;
        }

        order.setDoctorId(id);

        orderRepository.save(order);

        _json.put("success", true);

        // Gửi một mail báo đã đăng ký thành công.
        SendMail.send(
                order.getEmail(),
                order.getFullName() + " - Đặt Lịch Hẹn Thành Công",
                "Đặt lịch hẹn thành công, vui lòng chờ bác sĩ xác nhận."
        );

        return _json;
    }

}