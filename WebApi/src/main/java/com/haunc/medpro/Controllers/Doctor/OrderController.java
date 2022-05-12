package com.haunc.medpro.Controllers.Doctor;

import com.haunc.medpro.Helpers.SendMail;
import com.haunc.medpro.Models.Doctor;
import com.haunc.medpro.Models.DoctorUserDetails;
import com.haunc.medpro.Models.Order;
import com.haunc.medpro.Repositories.OrderRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import okhttp3.*;
import okhttp3.RequestBody;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Optional;

import static java.nio.charset.StandardCharsets.US_ASCII;

@RestController("DoctorOrderController")
@CrossOrigin
@RequestMapping(path = "/doctor")
public class OrderController {

    @Autowired
    public OrderRepository orderRepository;

    @GetMapping("/orders")
    public Page<Order> index(@AuthenticationPrincipal DoctorUserDetails details, Pageable pageable, @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword) {
        return orderRepository.findAllByDoctorIdAndPhoneNumberContaining(pageable, details.getUser().getId(), keyword);
    }

    @GetMapping("/orders/{id}")
    public Optional<Order> show(@AuthenticationPrincipal DoctorUserDetails details, @PathVariable("id") Integer id) {
        return orderRepository.findByDoctorIdAndId(details.getUser().getId(), id);
    }

    @PutMapping("/orders/{id}/_accept")
    public HashMap<String, Object> accept(@AuthenticationPrincipal DoctorUserDetails details, @PathVariable("id") Integer id) {
        HashMap<String, Object> _json = new HashMap<>();

        Optional<Order> orderOptional = orderRepository.findByDoctorIdAndId(details.getUser().getId(), id);

        if (orderOptional.isEmpty()) {
            _json.put("error", true);
            _json.put("message", "Không tìm thấy đơn hàng.");
        } else {
            Order order = orderOptional.get();
            order.setOrderStatus("ACCEPT");
            orderRepository.save(order);

            _json.put("success", true);

            String _zoomToken = Jwts.builder()
                    .signWith(SignatureAlgorithm.HS512, Base64.getEncoder().encodeToString("flAjBFfahCI8c9AISKw2rgOITjQdXBXv9919".getBytes(US_ASCII)))
                    .setIssuer("rPCaCH4TQEG8nZZ-Vj7BnA")
                    .setExpiration(new Date(System.currentTimeMillis() + 864_000_000)).compact();
            // _json.put("zoom_token", _zoomToken);

            try {
                JSONObject _settings = new JSONObject()
                        .put("host_video", true)
                        .put("participant_video", true);

                JSONObject _body = new JSONObject()
                        .put("topic", "test")
                        .put("type", 1)
                        .put("settings", _settings);
                okhttp3.RequestBody body = RequestBody.create(MediaType.parse("application/json; charset=utf-8"), _body.toString());
                Request request = new Request.Builder()
                        .url("https://api.zoom.us/v2/users/conghaunguyen994@gmail.com/meetings")
                        .addHeader("Authorization", "Bearer " + _zoomToken)
                        .post(body)
                        .build();

                OkHttpClient client = new OkHttpClient();
                Response response = client.newCall(request).execute();

                if (response.body() != null) {
                    JSONObject _zoomData = new JSONObject(response.body().string());

                    String _joinUrl = _zoomData.getString("join_url");
                    String _password = _zoomData.getString("password");

                    SendMail.send(
                            order.getEmail(),
                            order.getFullName() + " - Đã Xác Nhận.",
                            "Bác sĩ đã xác nhận lịch hẹn của bạn.\n" +
                                    "Link tham gia Zoom: " + _joinUrl + "\n" +
                                    "Mật khẩu: " + _password
                    );

                    SendMail.send(
                            details.getUser().getEmail(),
                            order.getFullName() + " - Đã Xác Nhận.",
                            "Bạn đã xác nhận lịch hẹn.\n" +
                                    "Link tham gia Zoom: " + _joinUrl + "\n" +
                                    "Mật khẩu: " + _password
                    );
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return _json;
    }

    @PutMapping("/orders/{id}/_reject")
    public HashMap<String, Object> reject(@AuthenticationPrincipal DoctorUserDetails details, @PathVariable("id") Integer id) {
        HashMap<String, Object> _json = new HashMap<>();

        Optional<Order> orderOptional = orderRepository.findByDoctorIdAndId(details.getUser().getId(), id);

        if (orderOptional.isEmpty()) {
            _json.put("error", true);
            _json.put("message", "Không tìm thấy đơn hàng.");
        } else {
            Order order = orderOptional.get();
            order.setOrderStatus("REJECT");

            orderRepository.save(order);

            _json.put("success", true);
        }

        return _json;
    }

}
