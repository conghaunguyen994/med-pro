package com.haunc.medpro.Repositories;

import com.haunc.medpro.Models.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface DoctorRepository extends PagingAndSortingRepository<Doctor, Integer> {
    Page<Doctor> findByNameLike(Pageable pageable, String keyword);

    Page<Doctor> findAllByOrderByIdDesc(Pageable pageable);

    Page<Doctor> findByDepartmentId(Pageable pageable, Integer departmentId);

    Optional<Doctor> findByUsername(String username);

    Optional<Doctor> findByUsernameAndPassword(String username, String password);
}
