import { Link } from "react-router-dom";
import React from "react";
import QRCode from "qrcode.react";

function UserList({ users }) {
  return (
    <div className="container p-3 rounded">
      <div className="card mb-2 text-center" >
        <div className="row row-cols-2 row-cols-lg-4 row-cols-md-3">
          {users.map((user) => (
            <div className="col m-4" key={user.id}>
              <QRCode value={user.qrValue} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserList;
