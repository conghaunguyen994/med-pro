package com.haunc.medpro.Tasks;

import com.haunc.medpro.Models.Doctor;
import com.haunc.medpro.Models.Order;
import com.haunc.medpro.Repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class OrderTask {

    @Autowired
    private OrderRepository orderRepository;

    // Delay 2000ms = 2s
    // Nó đã tự chạy sau mỗi 2 giây, giờ phải kết nối tới database để quét các lịch hẹn
    // với điều kiện là thời gian đặt lịch <= ngày giờ hiện tại + 2 tiếng
    // mục đích là để báo cho người dùng biết lịch hẹn của mình sắp tới giờ
    @Scheduled(fixedRate = 5 * 1000)
    public void handle() {
        Iterable<Order> _orders = orderRepository.findAll();

//        for (Order order : _orders) {
//        }
    }
}
