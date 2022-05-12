import React from "react";
import moment from "moment";
import "moment/locale/vi";

import { useApi } from "../hooks/useApi";

moment.locale("vi");

export default function OrderItem({
  item,
  onAcceptDone,
  onRejectDone,
  onLoading,
}) {
  const [isAcceptLoading, sendAcceptOrder] = useApi(
    `/doctor/orders/${item.id}/_accept`,
    { method: "PUT" }
  );
  const [isRejectLoading, sendRejectOrder] = useApi(
    `/doctor/orders/${item.id}/_reject`,
    { method: "PUT" }
  );

  const handleAcceptClick = async (id) => {
    onLoading(true);

    const data = await sendAcceptOrder();
    console.log(data);

    onAcceptDone();

    onLoading(false);
  };

  const handleRejectClick = async () => {
    onLoading(true);

    const data = await sendRejectOrder();
    console.log(data);

    onRejectDone();

    onLoading(false);
  };

  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.fullName}</td>
      <td>{item.phoneNumber}</td>

      {item.gender == "MALE" && <td>Nam</td>}
      {item.gender == "FEMALE" && <td>Nữ</td>}
      {item.gender == "UNKNOWN" && <td>Không biết</td>}

      <td>{moment().diff(moment(item.birthday), "year")}</td>
      <td>{moment(item.scheduleAt).format("LLL")}</td>
      <td>
        {item.orderStatus == "PENDING" && (
          <div className="btn-group btn-group-sm">
            <div className="btn btn-default" onClick={handleAcceptClick}>
              Chấp nhận
            </div>
            <div className="btn btn-danger" onClick={handleRejectClick}>
              Từ chối
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}
