package com.haunc.medpro.Repositories;

import com.haunc.medpro.Models.Doctor;
import com.haunc.medpro.Models.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Date;
import java.util.Optional;

public interface OrderRepository extends PagingAndSortingRepository<Order, Integer> {
    // Query với 2 điều kiện là
    // doctor_id = [doctorId] và schedule_at bắt đầu từ [startDate] đến [endDate]
    Iterable<Order> findByDoctorIdAndScheduleAtBetween(Integer doctorId, Date startDate, Date endDate);

    Page<Order> findAllByDoctorId(Pageable pageable, Integer doctorId);

    Optional<Order> findByDoctorIdAndId(Integer doctorId, Integer id);

    Page<Order> findAllByDoctorIdAndPhoneNumberContaining(Pageable pageable, Integer doctorId, String keyword);
}
