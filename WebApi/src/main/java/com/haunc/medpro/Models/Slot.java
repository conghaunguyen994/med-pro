package com.haunc.medpro.Models;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Table(name = "slots")
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    @Column(name = "begin_at")
    private Time beginAt;

    @Column(name = "end_at")
    private Time endAt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Time getBeginAt() {
        return beginAt;
    }

    public void setBeginAt(Time beginAt) {
        this.beginAt = beginAt;
    }

    public Time getEndAt() {
        return endAt;
    }

    public void setEndAt(Time endAt) {
        this.endAt = endAt;
    }
}
