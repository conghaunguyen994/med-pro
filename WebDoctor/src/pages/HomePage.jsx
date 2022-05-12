import React, { useEffect, useState } from "react";

import OrderItem from "../components/OrderItem";
import { useApi } from "../hooks/useApi";

let timer;

export default function HomePage() {
  const [orders, setOrders] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [isLoadingBox, setIsLoadingBox] = useState(false);

  const [isLoading, loadOrder] = useApi("/doctor/orders");

  useEffect(() => {
    loadData();

    return () => {};
  }, []);

  const loadData = async (page = 0, keyword = "") => {
    setIsLoadingBox(true);

    const data = await loadOrder(`?page=${page}&keyword=${keyword}`);

    setOrders(data.content);
    setTotalPage(data.totalPages);
    setCurrentPage(page);

    setIsLoadingBox(false);
  };

  const handleClickPage = (page) => {
    console.log(page);

    loadData(page);
  };

  const handleKeyUp = (e) => {
    if (timer != null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      loadData(0, e.target.value);
    }, 1000);
  };

  return (
    <div className="content">
      <div className="box">
        <div className="box-header with-border">
          <div className="box-title">Danh Sách Lịch Hẹn</div>
          <div className="box-tools">
            <input
              type="text"
              className="form-control pull-right"
              placeholder="Nhập số điện thoại cần tìm ..."
              style={{ width: 300 }}
              onKeyUp={handleKeyUp}
            />
          </div>
        </div>
        <div className="box-body table-responsive no-padding">
          <table className="table table-hover">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Số điện thoại</th>
                <th>Giới tính</th>
                <th>Tuổi</th>
                <th>Thơi gian khám</th>
                <th></th>
              </tr>
              {orders.map((order) => (
                <OrderItem
                  item={order}
                  key={order.id}
                  onAcceptDone={() => handleClickPage(currentPage)}
                  onRejectDone={() => handleClickPage(currentPage)}
                  onLoading={(val) => setIsLoadingBox(val)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="box-footer clearfix">
          <ul className="pagination no-margin pull-right">
            {currentPage > 0 && (
              <li>
                <a onClick={() => handleClickPage(currentPage - 1)}>«</a>
              </li>
            )}
            {Array.from(Array(totalPage).keys()).map((i) => (
              <li key={i} className={currentPage == i ? "active" : ""}>
                <a onClick={() => handleClickPage(i)}>{i + 1}</a>
              </li>
            ))}
            {currentPage < totalPage - 1 && (
              <li>
                <a onClick={() => handleClickPage(currentPage + 1)}>»</a>
              </li>
            )}
          </ul>
        </div>
        {isLoadingBox && (
          <div class="overlay">
            <i class="fa fa-refresh fa-spin"></i>
          </div>
        )}
      </div>
    </div>
  );
}
