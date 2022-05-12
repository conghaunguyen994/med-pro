import React, { useState } from "react";

export default function CreateDoctorPage() {
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleClickEdit = async () => {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("departmentId", departmentId);
    formdata.append("avatarUrl", avatarUrl);
    formdata.append("description", description);

    await fetch("http://localhost:8080/admin/doctors", {
      method: "POST",
      body: formdata,
      redirect: "follow",
    });
    setName("");
    setAvatarUrl("");
    setDepartmentId("");
    setDescription("");

    window.alert("đã thêm bác sĩ thành công");
  };
  return (
    <div>
      <section className="content-header">
        <h1>Thêm Bác Sĩ</h1>
      </section>
      <div className="content">
        <div className="box box-primary">
          <form role="form">
            <div className="box-body">
              <div className="form-group">
                <label>Tên</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập Tên"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Chuyên Khoa</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.currentTarget.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Hình Ảnh</label>
                <input
                  type="text"
                  className="form-control"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.currentTarget.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Mô Tả</label>
                <textarea
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter email"
                  value={description}
                  onChange={(e) => setDescription(e.currentTarget.value)}
                />
              </div>
            </div>

            <div className="box-footer">
              <button
                onClick={handleClickEdit}
                type="button"
                className="btn btn-primary"
              >
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
