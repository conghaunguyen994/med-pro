import React, { useState, useEffect } from "react";

import { useApi } from "../hooks/useApi";

export default function ProfilePage(props) {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [description, setDescription] = useState("");

  const [avatar, setAvatar] = useState(null);

  const [isLoading, loadProfile] = useApi("/doctor/profile");
  const [isUpdateLoading, sendUpdateProfile] = useApi("/doctor/profile", {
    method: "PUT",
  });

  useEffect(() => {
    loadData();

    return () => {};
  }, []);

  const loadData = async () => {
    const data = await loadProfile();

    setName(data.name);
    setDescription(data.description);
    setAvatarUrl(data.avatarUrl);
  };

  const handleClickEdit = async () => {
    console.log(avatar);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("avatar", avatar);

    const data = await sendUpdateProfile("", formData, true);

    if (data.success) {
      alert("Sửa thành công.");

      loadData();
    }
  };

  return (
    <div>
      <section className="content-header">
        <h1>Sửa Thông Tin Bác Sĩ</h1>
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
                <label htmlFor="exampleInputEmail1">Hình Ảnh</label>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      value={avatarUrl || ""}
                      onChange={(e) => setAvatarUrl(e.currentTarget.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setAvatar(e.currentTarget.files[0])}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Mô Tả</label>
                <textarea
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter email"
                  value={description || ""}
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
                Sửa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
