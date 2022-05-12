package com.haunc.medpro.Controllers.Customer;

import com.haunc.medpro.Models.Doctor;
import com.haunc.medpro.Models.Order;
import com.haunc.medpro.Models.Slot;
import com.haunc.medpro.Repositories.DoctorRepository;
import com.haunc.medpro.Repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.*;
import java.util.*;

@RestController()
@CrossOrigin
@RequestMapping(path = "/customer/departments")
public class SlotController {

    @Autowired
    public DoctorRepository doctorRepository;

    @Autowired
    public OrderRepository orderRepository;

    @GetMapping("/{did}/doctors/{id}/slots")
    public HashMap<String, Object> index(@PathVariable("id") Integer id, @RequestParam(value = "date", required = false, defaultValue = "") String date) {
        HashMap<String, Object> json = new HashMap<>();

        Optional<Doctor> doctorOptional = doctorRepository.findById(id);

        if (doctorOptional.isEmpty()) {
            json.put("error", true);
            json.put("message", "Không tim thấy bác sĩ");

            return json;
        }

        Doctor doctor = doctorOptional.get();

        int _est = doctor.getEstDuration();
        long _addMilis = Duration.ofMinutes(_est).toMillis();

        // Định dạng khung giờ 00:00
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");

        // Lấy chính xác thời gian hiện tại dựa vào máy tính
        LocalDate _now = LocalDate.now();

        // Nếu giá trị truyền từ QueryParam không bằng rỗng ("") thì thay đổi giá trị biến _now bằng cách
        // parse dữ liệu từ chuỗi ngày 2022-02-02 thành dạng LocalDate
        if (!date.equals("")) {
            _now = LocalDate.parse(date);
        }

        // Dùng các hàm hỗ trợ để lùi thời gian về giờ bắt đầu và giờ kết thúc nằm tạo khung thời gian
        // cho câu lệnh truy vấn MySQL
        Date _startDate = Date.from(_now.atStartOfDay().toInstant(ZoneOffset.UTC));
        Date _endDate = Date.from(_now.atTime(LocalTime.MAX).toInstant(ZoneOffset.UTC));

        // Mảng chứa thời gian chính xác từ orders dưới dạng mảng trong mảng
        // [[1,2], [1,2], ...]
        // 1: đại diện cho dữ liệu thời gian bắt đầu mỗi ca khám
        // 2: đại diện cho dữ liệu thời gian kết thúc ước tính của ca khám
        List<long[]> _oldList = new ArrayList<>();

        // Thực hiện truy vấn + tạo vòng lặp foreach để xử lý dữ liệu
        Iterable<Order> _orders = orderRepository.findByDoctorIdAndScheduleAtBetween(doctor.getId(), _startDate, _endDate);
        for (Order order : _orders) {
            // Lấy ra khung giờ dự kiến mà lịch khám này sẽ chiếm
            long _scheduleBeginAt = order.getScheduleAt().getTime();
            long _scheduleEndAt = _addMilis + order.getScheduleAt().getTime();

            // Vì vậy chỗ này luôn add vào mảng _oldList một mảng con có 2 giá trị duy nhất
            // gồm dữ liệu thời gian bắt đầu và kết thúc
            _oldList.add(new long[]{_scheduleBeginAt, _scheduleEndAt}); // Trước đầu phẩy là 0, sau đấu phẩy là 1
        }

        for (Slot slot : doctor.getSlots()) {
            List<HashMap<String, Object>> _ls = new ArrayList<>();

            long _begin = slot.getBeginAt().getTime();
            long _end = slot.getEndAt().getTime();

            // Vòng lặp vô tận với điều kiện ngắt vòng lặp là giờ bắt đầu ở vị trí lặp
            // nhỏ hơn giờ kết thúc trên biến toàn cục, câu lệnh cũ là "nhỏ hơn hoặc bằng"
            // nên kết quả tính toán bị sai
            while (_begin < _end) {
                HashMap<String, Object> _item = new HashMap<>();

                _item.put("begin", sdf.format(new Date(_begin)));
                _item.put("end", sdf.format(new Date(_begin + _addMilis)));

                // Để xử lý được dữ liệu này thì trước tiên phải lấy được từ database ra những
                // lịch hẹn thuộc khung giờ này, từ đó so sánh trạng thái để biết được là true hay false
                boolean _isFree = true;

                // Lặp hết mảng _oldList để xử lý mảng con
                for (long[] l : _oldList) {
                    // Như đã mô tả trước đó, mảng này chỉ gồm thời gian bắt đầu và kết thúc nên chỉ lấy ở
                    // 2 index là 0 và 1, sau đó gán giá trị cho nó là _b và _e tương ứng
                    long _b = l[0];
                    long _e = l[1];

                    // Dùng thư viện Calendar để chuyển dữ liệu thời gian từ mili thành Calendar
                    // từ đó mới lấy được dữ liệu giờ + phút để so sánh

                    // _cal1 = thời gian bắt đầu của ca khám này trong bảng orders
                    Calendar _cal1 = Calendar.getInstance();
                    _cal1.setTime(new Date(_b));

                    // _cal2 = thời gian bắt đầu của khung giờ (slot) được phân từ giờ khám của bác sĩ trong bảng
                    // slots
                    Calendar _cal2 = Calendar.getInstance();
                    _cal2.setTime(new Date(_begin));

                    // _cal3 = thời gian kết thúc của ca khám này trong bảng orders
                    Calendar _cal3 = Calendar.getInstance();
                    _cal3.setTime(new Date(_e));

                    // _cal4 = thời gian kết thúc của khung giờ (slot) được phân từ giờ khám của bác sĩ trong bảng
                    // slots
                    Calendar _cal4 = Calendar.getInstance();
                    _cal4.setTime(new Date(_begin + _addMilis));

                    // So sách các tham sô với điều kiện nghiệp vụ như sau:
                    // Nếu giờ + phút của ca khám tìm được ở bảng order trùng với giờ + phút của slot được phân từ
                    // bảng slots bằng nhau thì giá trị của is_free sẽ bị đổi thành false vì phát hiện trùng giờ khám
                    if ((_cal1.get(Calendar.HOUR_OF_DAY) == _cal2.get(Calendar.HOUR_OF_DAY) && _cal1.get(Calendar.MINUTE) == _cal2.get(Calendar.MINUTE)) &&
                            (_cal3.get(Calendar.HOUR_OF_DAY) == _cal4.get(Calendar.HOUR_OF_DAY) && _cal3.get(Calendar.MINUTE) == _cal4.get(Calendar.MINUTE))) {
                        _isFree = false;

                        break;
                    }
                }

                // Đặt giá trị sau khi xử lý dữ liệu xong
                _item.put("is_free", _isFree);

                //
                _ls.add(_item);

                // Sau mỗi lần lặp sẽ thêm số giây (quy đổi từ phút) để lần lặp tiếp theo
                // thì so sánh tiếp với _end xem đủ điều kiện ngắt vòng lặp hay ko
                _begin += _addMilis;
            }

            json.put(slot.getName(), _ls);
        }


        return json;
    }

}
