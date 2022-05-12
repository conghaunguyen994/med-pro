package com.haunc.medpro.Repositories;

import com.haunc.medpro.Models.Department;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface DepartmentRepository extends PagingAndSortingRepository<Department, Integer> {
}
