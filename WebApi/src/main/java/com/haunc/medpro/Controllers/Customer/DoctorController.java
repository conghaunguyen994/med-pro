package com.haunc.medpro.Controllers.Customer;

import com.haunc.medpro.Models.Doctor;
import com.haunc.medpro.Repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController("CustomerDoctorController")
@CrossOrigin
@RequestMapping(path = "/customer/departments")
public class DoctorController {

    @Autowired
    public DoctorRepository doctorRepository;

    @GetMapping("/{did}/doctors")
    public Iterable<Doctor> index(Pageable pageable, @PathVariable("did") Integer id) {
        return doctorRepository.findByDepartmentId(pageable, id);
    }

    @GetMapping("/{did}/doctors/{id}")
    public Optional<Doctor> index(@PathVariable("id") Integer id) {
        return doctorRepository.findById(id);
    }

}
