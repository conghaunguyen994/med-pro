import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useApi } from "../hooks/useApi";
import { useStores } from "../stores";

const DepartmentListView = observer(() => {
  const { departmentStore: store } = useStores();

  const [isLoading, loadDepartments] = useApi("/customer/departments");

  useEffect(() => {
    // Lấy dữ liệu ở list trong store để đếm xem có dữ liệu chưa, nếu chưa thì chạy
    // hook useApi để load dữ liệu.
    if (store.list.length == 0) {
      // Sau khi load xong thì đổ nó vào state bằng action `setList`
      loadDepartments().then(store.setList);
    }
  }, []);

  return (
    <div className="mt-10 grid grid-cols-6 gap-8">
      {/* Khi setList chạy xong thì danh sách tại đấy sẽ tự render lại */}
      {store.list.map((department) => (
        <Link
          to={"/chuyen-khoa/" + department.id}
          className="p-3 grid justify-items-center bg-white drop-shadow rounded-md"
          key={department.id}
        >
          <img
            src={`/assets/img/d_${department.id}.png`}
            alt=""
            style={{ height: 80 }}
          />
          <div className="mt-2 font-bold">{department.name}</div>
        </Link>
      ))}
    </div>
  );
});

const HomePage = () => {
  return (
    <div>
      <div
        className="py-20 bg-sky-300"
        style={{
          backgroundImage: "url(http://localhost:3000/assets/img/homepage_doctor .webp)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "200px",
        }}
      >
        <div className="container mx-auto md:px-20">
          <div className="text-2xl font-bold">
            Đặt lịch hẹn với bác sĩ dễ dàng
          </div>
          <div className="text-lg">
            Giúp bạn đơn giản hóa việc tìm kiếm bác sĩ và dịch vụ y tế phù hợp
            với nhu cầu sức khoẻ, dù ở bất kỳ đâu.
          </div>
        </div>
      </div>
      <div className="flex justify-center" style={{ marginTop: -32 }}>
        <input
          type="text"
          placeholder="Nhập tên chuyên khoa hoặc bác sĩ cần tìm ..."
          className="bg-white px-6 py-5 drop-shadow-lg rounded-md w-3/5"
        />
      </div>
      <div className="py-20">
        <div className="container mx-auto md:px-20">
          <div className="text-2xl font-bold text-center">
            Tìm bác sĩ và bệnh viện theo chuyên khoa
          </div>
          <DepartmentListView />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
