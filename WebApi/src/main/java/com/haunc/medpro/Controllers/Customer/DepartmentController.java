package com.haunc.medpro.Controllers.Customer;

import com.haunc.medpro.Models.Department;
import com.haunc.medpro.Repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@CrossOrigin
@RequestMapping(path = "/customer")
public class DepartmentController {

    @Autowired
    public DepartmentRepository departmentRepository;

    @GetMapping("/departments")
    public Iterable<Department> index() {
        return departmentRepository.findAll();
    }

}
