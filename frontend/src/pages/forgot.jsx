import { useState } from "react";
import { Navigate } from "react-router-dom";

function Forgot() {
  const [emails, Changemail] = useState(null);
  const [success, Changsuccess] = useState(null);
  const [otps, Changotps] = useState(null);
  const [pass, setpass] = useState("");

  const emailid = (e) => Changemail(e.target.value);
  const otp = (e) => Changotps(e.target.value);
  const password = (e) => setpass(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailid: emails }),
    })
      .then((res) => res.json())
      .then((data) => {
        Changsuccess(data.success);
        Changemail(data.email);
        if (data.success) {
          alert("OTP sent to your email. Please enter within 50 seconds.");
        } else {
          alert(data.message);
          Changsuccess(null);
        }
      });
  };

  const handleverify = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailid: emails, otp: otps }),
    })
      .then((res) => res.json())
      .then((data) => {
        Changsuccess(data.success);
        Changemail(data.email);
        if (data.success) {
          alert("Verified! Now change your password.");
          Changsuccess("verify");
        } else {
          alert(data.message);
          Changsuccess(null);
          Changemail("");
        }
      });
  };

  const chagepassword = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/forgot/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailid: emails, password: pass }),
    })
      .then((res) => res.json())
      .then((data) => {
        Changsuccess(data.success);
        if (data.success) {
          alert(data.message);
          Changsuccess("completed");
        } else {
          alert(data.message);
          Changsuccess(null);
          Changemail("");
        }
      });
  };

  const formWrapperClasses =
    "w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-xl p-8 animate-fadeIn transform transition duration-500";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center "
      style={{
        backgroundImage: `url('https://wallpaperaccess.com/full/1103738.jpg')`,
      }}
    >
      {(() => {
        switch (success) {
          case "verify":
            return (
              <form onSubmit={chagepassword} className={formWrapperClasses}>
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
                  ReviveMart - <span className="text-blue-600">Change Password</span>
                </h3>
                <input
                  type="password"
                  name="password"
                  value={pass}
                  placeholder="Enter new password"
                  onChange={password}
                  required
                  className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Change Password
                </button>
              </form>
            );
          case "completed":
            return <Navigate to="/" replace={true} />;
          case true:
            return (
              <form onSubmit={handleverify} className={formWrapperClasses}>
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
                  ReviveMart - <span className="text-green-600">Verify OTP</span>
                </h3>
                <input
                  type="email"
                  name="emailid"
                  value={emails}
                  placeholder="Enter email"
                  onChange={emailid}
                  required
                  className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  onChange={otp}
                  required
                  className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  Verify OTP
                </button>
              </form>
            );
          case null:
            return (
              <form onSubmit={handleSubmit} className={formWrapperClasses}>
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
                  ReviveMart - <span className="text-purple-600">Send OTP</span>
                </h3>
                <input
                  type="email"
                  name="emailid"
                  value={emails}
                  placeholder="Enter your email"
                  onChange={emailid}
                  required
                  className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                >
                  Send OTP
                </button>
              </form>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default Forgot;
