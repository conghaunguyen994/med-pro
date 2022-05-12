package com.haunc.medpro.Controllers.Doctor;

import com.haunc.medpro.Models.Doctor;
import com.haunc.medpro.Repositories.DoctorRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(path = "/doctor")
public class LoginController {

    @Autowired
    private DoctorRepository doctorRepository;

    @PostMapping("/login")
    public HashMap<String, Object> login(@RequestBody HashMap<String, String> body) {
        HashMap<String, Object> _json = new HashMap<>();

        // Hứng tham số usernamr với password
        String _username = body.get("username");
        String _password = body.get("password");

        String _hashedPassword = null;

        try {
            MessageDigest digest = MessageDigest.getInstance("MD5");
            digest.update(_password.getBytes());

            _hashedPassword = DatatypeConverter.printHexBinary(digest.digest());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        if (_hashedPassword != null) {
            // Query vào database với username và password nhận được
            Optional<Doctor> _doctorOptional = doctorRepository.findByUsernameAndPassword(_username, _hashedPassword);

            // Trường hợp không có dữ liệu
            if (_doctorOptional.isEmpty()) {
                _json.put("error", true);
                _json.put("message", "Sai tài khoản hoặc mật khẩu.");
            } else {
                String _token = Jwts.builder()
                        .setSubject(_doctorOptional.get().getUsername())
                        .setExpiration(new Date(System.currentTimeMillis() + 864_000_000))
                        .signWith(SignatureAlgorithm.HS512, "medprovn")
                        .compact();

                _json.put("success", true);
                _json.put("token", _token);
            }
        } else {
            _json.put("error", true);
            _json.put("message", "Sai tài khoản hoặc mật khẩu.");
        }


        return _json;
    }

}
