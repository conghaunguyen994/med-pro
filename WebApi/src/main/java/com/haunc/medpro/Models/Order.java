package com.haunc.medpro.Models;

import com.haunc.medpro.Enums.OrderGender;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String email;

    @Column(name = "id_card")
    private String idCard;

    private Date birthday;

    @Enumerated(EnumType.STRING)
    private OrderGender gender;

    @Column(name = "schedule_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date scheduleAt;

    @Column(name = "order_status")
    private String orderStatus;

    @Column(name = "payment_status")
    private String paymentStatus;

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    @Column(name = "doctor_id")
    private Integer doctorId;

    @OneToOne(optional = false)
    @JoinColumn(name = "doctor_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Doctor doctor;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public OrderGender getGender() {
        return gender;
    }

    public void setGender(OrderGender gender) {
        this.gender = gender;
    }

    public Date getScheduleAt() {
        return scheduleAt;
    }

    public void setScheduleAt(Date scheduleAt) {
        this.scheduleAt = scheduleAt;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }
}
