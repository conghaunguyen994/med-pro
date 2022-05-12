import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { Link, useParams } from "react-router-dom";
import numeral from "numeral";
import "numeral/locales/vi";
import moment from "moment";

import { useApi } from "../hooks/useApi";
import { useStores } from "../stores";

numeral.locale("vi");

const DoctorPage = observer(() => {
  const { doctorStore: store } = useStores();

  const { id } = useParams();

  const [isLoading, loadDoctor] = useApi(
    `/customer/departments/${store.departmentId}/doctors/${id}`
  );

  const [isLoadingSlots, loadSlots] = useApi(
    `/customer/departments/${store.departmentId}/doctors/${id}/slots`
  );

  useEffect(() => {
    store.setDate(null);
    store.setSlot(null);
    store.setSlots([]);

    loadDoctor().then((value) => {
      store.setDoctor(value);
    });

    return () => {};
  }, []);

  const handleChangeDate = (date) => {
    store.setDate(date);
    store.setSlot(null);
    store.setSlots({});

    // YYYY-MM-DD
    const d = moment(store.date).format("YYYY-MM-DD");
    loadSlots(`?date=${d}`).then((value) => {
      store.setSlots(value);
    });
  };

  return (
    store.doctor != null && (
      <div className="container mx-auto md:px-20">
        <div className="flex flex-row gap-6">
          <div className="flex-1">
            <div className="p-6 mb-6 border flex flex-row rounded-lg bg-white">
              <div className="mr-4">
                <img
                  src=
                  {store.doctor.avatarUrl}
                  alt=""
                  style={{
                    height: 160,
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="mb-2 text-xl font-bold">
                  {store.doctor.name}
                </div>
                <div className="mb-2 text-base font-semibold">
                  {store.doctor.department.name}
                </div>
                <div className="text-lg font-bold text-green-600">
                  {numeral(store.doctor.price).format("0,0$")}
                </div>
              </div>
            </div>
            <div className="p-6 border rounded-lg bg-white">
              <div className="mb-3 font-bold">Thông tin bác sĩ</div>
              {store.doctor.description != null &&
              store.doctor.description != "" ? (
                <div
                  dangerouslySetInnerHTML={{ __html: store.doctor.description }}
                ></div>
              ) : (
                <div>Chưa có mô tả.</div>
              )}
            </div>
          </div>
          <div className="p-6 border rounded-lg w-72 bg-white">
            <div className="mb-3 font-bold">Chọn ngày giờ khám</div>
            <div className="mb-6">
              <DatePicker
                selected={store.date}
                minDate={new Date()}
                onChange={handleChangeDate}
                dateFormat="dd-MM-yyyy"
                className="border rounded w-full px-4 py-2"
              />
            </div>
            {store.date != null && (
              <>
                {Object.keys(store.slots).map((key) => (
                  <div className="mb-6" key={key}>
                    <div className="mb-1">{key}</div>
                    <div className="grid grid-cols-4 gap-1">
                      {store.slots[key].map(
                        (slot, i) =>
                          slot.is_free && (
                            <button
                              key={i}
                              className={`rounded text-center ${
                                store.slot == slot.begin
                                  ? "bg-sky-400"
                                  : "bg-slate-200"
                              }`}
                              onClick={() => store.setSlot(slot.begin)}
                            >
                              {slot.begin}
                            </button>
                          )
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
            <Link
              to={"/xac-nhan"}
              className={`block w-full p-1 font-semibold text-lg text-white rounded text-center ${
                store.slot != null ? "bg-sky-400" : "bg-slate-300"
              }`}
            >
              Đặt lịch hẹn
            </Link>
          </div>
        </div>
      </div>
    )
  );
});

export default DoctorPage;
