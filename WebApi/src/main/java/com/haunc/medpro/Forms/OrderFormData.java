package com.haunc.medpro.Forms;

public class OrderFormData {
    private String fullName;
    private String phoneNumber;
    private String email;
    private String idCard;
    private String gender;
    private String scheduleAt;
    private String birthday;

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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getScheduleAt() {
        return scheduleAt;
    }

    public void setScheduleAt(String scheduleAt) {
        this.scheduleAt = scheduleAt;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }
}
