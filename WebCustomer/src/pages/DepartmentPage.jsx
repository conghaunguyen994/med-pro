import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import numeral from "numeral";
import "numeral/locales/vi";

import { useApi } from "../hooks/useApi";
import { useStores } from "../stores";

numeral.locale("vi");

const DoctorListView = observer(() => {
  const { doctorStore: store } = useStores();

  const { id } = useParams();

  const [isLoading, loadDoctors] = useApi(
    `/customer/departments/${id}/doctors`
  );

  useEffect(() => {
    // Điều kiện đúng và đủ là
    // 1: list chưa có dữ liệu
    // 2: id đang lưu trong store phải khác với id đang nhận từ params
    if (store.list.length == 0 || store.departmentId != id) {
      loadDoctors().then((value) => {
        // Như phẩn department thì nó trả về mảng, mình có thể gọi setDepartments trực tiếp để
        // nó đưa mảng vào thẳng rồi dùng .map để lặp giao diện.

        // Nhưng phần doctor này nó ko trả ra mảng, bởi vì nó có áp dụng cơ chế phân trang,
        // vậy nên buộc mình phải lấy từ field `content` thì mới có dữ liệu cần để dùng .map

        store.setList(value.content);
        store.setCurrentPage(value.number);
        store.setIsLastPage(value.last);
      });

      // Phải load bên trong if thì mới đúng
      store.setDepartmentId(id);
    }
  }, []);

  const handleLoadMore = () => {
    loadDoctors(`?page=${store.currentPage + 1}`).then((value) => {
      store.addList(value.content);
      store.setCurrentPage(value.number);
      store.setIsLastPage(value.last);
    });
  };

  return (
    <>
      {store.list.map((doctor) => (
        <div
          className="p-6 mb-6 border flex flex-row rounded-lg bg-white"
          key={doctor.id}
        >
          <div className="mr-4">
            <img
              src={doctor.avatarUrl}
              alt=""
              style={{
                height: 160,
              }}
            />
          </div>
          <div className="flex-1">
            <div className="mb-2 text-xl font-bold">{doctor.name}</div>
            <div className="mb-2 text-base font-semibold">
              {doctor.department.name}
            </div>
            <div className="text-lg font-bold text-green-600">
              {numeral(doctor.price).format("0,0$")}
            </div>
          </div>
          <div>
            <Link to={"/bac-si/" + doctor.id}>
              <button className="px-4 py-2 font-semibold text-lg bg-sky-500 text-white rounded">
                Đặt lịch hẹn
              </button>
            </Link>
          </div>
        </div>
      ))}
      {!store.isLastPage && (
        <div className="text-center">
          <button
            className="px-4 py-2 font-semibold text-lg bg-sky-500 text-white rounded"
            onClick={handleLoadMore}
          >
            Tải Thêm
          </button>
        </div>
      )}
    </>
  );
});

function DepartmentPage() {
  return (
    <div>
      <div className="container mx-auto md:px-20">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Nhập tên chuyên khoa hoặc bác sĩ cần tìm ..."
            className="bg-white px-6 py-5 drop-shadow rounded-md w-full"
          />
        </div>
        <DoctorListView />
      </div>
    </div>
  );
}

export default DepartmentPage;
