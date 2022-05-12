import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DoctorPage() {
  const [list, setList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
 
  useEffect(() => {
    loadData();
  

    return () => {};
  }, []);

  const loadData = async (page = 0) => {
    const data = await fetch("http://localhost:8080/admin/doctors?page=" + page);
    const json = await data.json();

    setList(json.content);
    setTotalPage(json.totalPages);
    setCurrentPage(page);
  };

  const handleClickPage = (page) => {
    console.log(page);

    loadData(page);
  };

  const handleClickDestroy = async (item) => {
    const isYes = window.confirm("Bạn có muốn xóa bác sĩ này không?");

    if (isYes) {
      await fetch("http://localhost:8080/admin/doctors/" + item.id, {
        method: "DELETE",
        redirect: "follow",
      });
      loadData(currentPage);
    }
  };

  return (
    <div>
      <section className="content-header">
        <h1>Bác Sĩ</h1>
      </section>
      <div className="content">
        <div className="box">
          <div className="box-header with-border">
            <h3 className="box-title">Danh Sách Bác Sĩ</h3>
            <div className="box-tools">
              <Link className="btn btn-default btn-sm" to={"/doctors/create"}>
                Thêm
              </Link>
            </div>
          </div>
          <div className="box-body">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Id</th>
                  <th>Tên Bác Sĩ</th>
                  <th>Mô tả</th>
                  <th></th>
                </tr>
                {list.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    
                    <td>
                      <Link
                        to={"/doctors/" + item.id + "/edit"}
                        className="btn btn-default btn-sm"
                      >
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleClickDestroy(item)}
                        className="btn btn-danger btn-sm"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="box-footer clearfix">
            <ul className="pagination pagination-sm no-margin pull-right">
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
        </div>
      </div>
    </div>
  );
}
