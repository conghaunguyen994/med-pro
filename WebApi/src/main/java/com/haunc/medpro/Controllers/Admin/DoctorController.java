package com.haunc.medpro.Controllers.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.Optional;

import com.haunc.medpro.Forms.DoctorFormData;
import com.haunc.medpro.Models.Doctor;
import com.haunc.medpro.Repositories.DoctorRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// cấp phép tài nguyên cho các tên miên khác
@RestController("AdminDoctorController")
@CrossOrigin
@RequestMapping(path = "/admin")
public class DoctorController {

    @Autowired
    public DoctorRepository doctorRepository;

    @GetMapping("/doctors")
    public Page<Doctor> index(Pageable pageable, @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword) {
        return keyword.isEmpty() ?
                doctorRepository.findAllByOrderByIdDesc(pageable) :
                doctorRepository.findByNameLike(pageable, keyword);
    }

    // thêm
    @PostMapping("/doctors")
    public HashMap<String, Object> store(@ModelAttribute DoctorFormData formData) {
        HashMap<String, Object> response = new HashMap<>();

        if (formData.getName() == null || formData.getName().isEmpty()) {
            response.put("success", false);
            response.put("message", "Name of product is null!");
        } else if (formData.getDepartmentId() == null) {
            response.put("success", false);
            response.put("message", "Chưa chọn chuyên khoa!");
        } else {
            Doctor doctor = new Doctor();
            doctor.setName(formData.getName());
            doctor.setDepartmentId(formData.getDepartmentId());
            doctor.setAvatarUrl(formData.getAvatarUrl());
            doctor.setDescription(formData.getDescription());

            doctorRepository.save(doctor);

            response.put("success", true);
        }

        return response;
    }

    @GetMapping("/doctors/{id}")
    public Optional<Doctor> show(@PathVariable("id") Integer id) {
        return doctorRepository.findById(id);
    }

    // sửa
    @PutMapping("/doctors/{id}")
    public HashMap<String, Object> update(@PathVariable("id") Integer id, @ModelAttribute DoctorFormData formData) {
        HashMap<String, Object> response = new HashMap<>();

        if (formData.getName() == null || formData.getName().isEmpty()) {
            response.put("success", false);
            response.put("message", "Chưa nhập tên bác sĩ!");
        } else if (formData.getDepartmentId() == null) {
            response.put("success", false);
            response.put("message", "Chưa chọn chuyên khoa!");
        } else {
            Optional<Doctor> doctorOptional = doctorRepository.findById(id);

            if (doctorOptional.isEmpty()) {
                response.put("success", false);
                response.put("message", "Không tìm thấy bác sĩ!");
            } else {
                Doctor doctor = doctorOptional.get();
                doctor.setName(formData.getName());
                doctor.setDepartmentId(formData.getDepartmentId());
                doctor.setAvatarUrl(formData.getAvatarUrl());
                doctor.setDescription(formData.getDescription());

                doctorRepository.save(doctor);

                response.put("success", true);
            }
        }

        return response;
    }

    @DeleteMapping("/doctors/{id}")
    public HashMap<String, Object> destroy(@PathVariable("id") Integer id) {
        doctorRepository.deleteById(id);

        HashMap<String, Object> response = new HashMap<>();
        response.put("success", true);

        return response;
    }
}
