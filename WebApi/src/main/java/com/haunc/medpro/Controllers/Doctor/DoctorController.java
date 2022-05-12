package com.haunc.medpro.Controllers.Doctor;

import com.haunc.medpro.Forms.DoctorUpdateFormData;
import com.haunc.medpro.Models.Doctor;
import com.haunc.medpro.Models.DoctorUserDetails;
import com.haunc.medpro.Repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.HashMap;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(path = "/doctor")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/profile")
    public Optional<Doctor> getProfile(@AuthenticationPrincipal DoctorUserDetails details) {
        return doctorRepository.findById(details.getUser().getId());
    }

    @PutMapping("/profile")
    public HashMap<String, Object> updateProfile(@AuthenticationPrincipal DoctorUserDetails details, DoctorUpdateFormData formData) {
        HashMap<String, Object> _json = new HashMap<>();

        try {
            File path = new File("C:\\Users\\Conghau\\SourceCode\\MedPro\\WebApi\\src\\main\\resources\\static\\avatars\\" + details.getUsername() + formData.getAvatar().getOriginalFilename());
            FileOutputStream output = new FileOutputStream(path);
            output.write(formData.getAvatar().getBytes());
            output.close();

            Doctor doctor = details.getUser();
            doctor.setDescription(formData.getDescription());
            doctor.setName(formData.getName());
            doctor.setAvatarUrl("http://localhost:8080/doctor/uploads/avatars/" + path.getName());
            doctorRepository.save(doctor);

            _json.put("success", true);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return _json;
    }

    @GetMapping(
            value = "/uploads/avatars/{path}",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public @ResponseBody
    byte[] getAvatar(@PathVariable("path") String filePath) throws IOException {
        File path = new File("C:\\Users\\Conghau\\SourceCode\\MedPro\\WebApi\\src\\main\\resources\\static\\avatars\\" + filePath);
        FileInputStream input = new FileInputStream(path);

        return input.readAllBytes();
    }

}
