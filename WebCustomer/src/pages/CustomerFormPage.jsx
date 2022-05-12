import { observer } from "mobx-react-lite";
import React from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";
import "moment/locale/vi";

import { useApi } from "../hooks/useApi";
import { useStores } from "../stores";

moment.locale("vi");

const CustomerFormPage = observer(() => {
  const { doctorStore: store, bookingStore: bstore } = useStores();

  const [isLoadingSendOrder, sendOrder] = useApi(
    `/customer/departments/${store.departmentId}/doctors/${store.doctor.id}/orders`,
    { method: "POST" }
  );

  const MySwal = withReactContent(Swal);

  const handleConfirmClick = () => {
    if (bstore.fullName == null || bstore.fullName.length < 2) {
      MySwal.fire({
        icon: "warning",
        text: "Bạn chưa nhập tên.",
      });
    } else if (bstore.phoneNumber == null || bstore.phoneNumber.length < 10) {
      MySwal.fire({
        icon: "warning",
        text: "Bạn chưa nhập số điện thoại.",
      });
    } else if (bstore.email == null || bstore.email == "") {
      MySwal.fire({
        icon: "warning",
        text: "Bạn chưa nhập email.",
      });
    } else if (bstore.idCard == null || bstore.idCard.length < 10) {
      MySwal.fire({
        icon: "warning",
        text: "Bạn chưa nhập số CMND.",
      });
    } else {
      MySwal.fire({
        text: "Đang đặt lịch ...",
        didOpen: async () => {
          Swal.showLoading();

          await sendOrder("", {
            fullName: bstore.fullName,
            phoneNumber: bstore.phoneNumber,
            email: bstore.email,
            idCard: bstore.idCard,
            gender: bstore.gender,
            birthday: moment(bstore.birthday).format("YYYY-MM-DD"),
            scheduleAt: getScheduleAt("YYYY-MM-DD HH:mm:ss"),
          });

          setTimeout(() => {
            MySwal.fire({
              icon: "success",
              text: "Đặt lịch hẹn thành công.",
            });
          }, 1000);
        },
      });
    }
  };

  const getScheduleAt = (fmt = "LT ll") => {
    const arr = store.slot.split(":").map((x) => parseInt(x, 10));

    return moment(store.date)
      .add(arr[0], "hour")
      .add(arr[1], "minute")
      .format(fmt);
  };

  return store.doctor != null ? (
    <div className="container mx-auto md:px-20">
      <div className="flex flex-row gap-6">
        <div className="flex-1">
          <div className="p-6 border rounded-lg bg-white">
            <div className="mb-2 font-bold text-xl">Nhập thông tin cá nhân</div>
            <div className="mb-8 text-base">
              Những thông tin này dùng để xác nhận lịch hẹn với bác sĩ. Chúng
              tôi sẽ không chia sẽ thông tin cá nhân của bạn với bên thứ 3.
            </div>
            <div className="mb-6 w-full block">
              <label htmlFor="full_name" className="inline-block mb-2">
                Họ Tên
              </label>
              <input
                id="full_name"
                type="text"
                className="block border rounded w-full px-4 py-2"
                value={bstore.fullName}
                onChange={(e) => bstore.setFullName(e.target.value)}
              />
            </div>
            <div className="mb-6 w-full block">
              <label htmlFor="full_name" className="inline-block mb-2">
                Số Điện Thoại
              </label>
              <input
                id="full_name"
                type="text"
                className="block border rounded w-full px-4 py-2"
                value={bstore.phoneNumber}
                onChange={(e) => bstore.setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-6 w-full block">
              <label htmlFor="full_name" className="inline-block mb-2">
                Email
              </label>
              <input
                id="full_name"
                type="text"
                className="block border rounded w-full px-4 py-2"
                value={bstore.email}
                onChange={(e) => bstore.setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 w-full block">
              <label htmlFor="full_name" className="inline-block mb-2">
                Số CMND
              </label>
              <input
                id="full_name"
                type="text"
                className="block border rounded w-full px-4 py-2"
                value={bstore.idCard}
                onChange={(e) => bstore.setIdCard(e.target.value)}
              />
            </div>
            <div className="mb-6 w-full block">
              <label htmlFor="full_name" className="inline-block mb-2">
                Giới Tính
              </label>
              <select
                id="full_name"
                className="block border rounded w-full p-3"
                onChange={(e) => bstore.setGender(e.target.value)}
              >
                <option>Chọn giới tính</option>
                <option value="MALE" selected={bstore.gender == "MALE"}>
                  Nam
                </option>
                <option value="FEMALE" selected={bstore.gender == "FEMALE"}>
                  Nữ
                </option>
                <option value="UNKNOWN" selected={bstore.gender == "UNKNOWN"}>
                  Không biết
                </option>
              </select>
            </div>
            <div className="mb-12 w-full block">
              <label htmlFor="full_name" className="inline-block mb-2">
                Ngày Sinh
              </label>
              <DatePicker
                selected={bstore.birthday}
                maxDate={new Date()}
                onChange={(date) => bstore.setBirthday(date)}
                dateFormat="dd-MM-yyyy"
                className="block border rounded w-full px-4 py-2"
              />
            </div>
            <button
              className="px-6 py-2 font-semibold text-lg text-white rounded text-center bg-sky-400"
              onClick={handleConfirmClick}
            >
              Xác Nhận
            </button>
          </div>
        </div>
        <div className="p-6 border rounded-lg w-80 bg-white">
          <div className="mb-3 font-bold">Thông tin lịch hẹn</div>
          <div className="p-3 rounded border bg-slate-100">
            <div className="mb-2">
              Bác sĩ: <b>{store.doctor.name}</b>
            </div>
            <div className="mb-2">
              Chuyên khoa: <b>{store.doctor.department.name}</b>
            </div>
            <div>
              Ngày giờ: <b>{getScheduleAt()}</b>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="p-6 border rounded-lg bg-white text-center">
        <div className="">Đặt Lịch Thành Công</div>
        <div>
          Cảm ơn bạn đã sử dụng hệ thống đặt lịch hẹn của MedPro, vui lòng chờ
          bác sĩ xác nhận.
        </div>
      </div> */}
    </div>
  ) : (
    <div className="text-center">Không có thông tin lịch hẹn.</div>
  );
});

export default CustomerFormPage;
