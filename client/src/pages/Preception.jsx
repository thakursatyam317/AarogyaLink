import React, { useEffect, useState } from "react";
import authAxios from "../utils/authAxios";

const Perception = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const res = await authAxios.get("/prescription/preceptionUser");
        setData(res.data.data);
        console.log("Prescription Data:", res.data);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };

    fetchPrescription();
  }, []);
  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
        Perception Records
        </h2>
       
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Doctor
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Patient
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Appointment Date
              </th>
              <th className="p-4 text-center text-sm font-semibold text-gray-600">
                Prescription
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No perception records found
                </td>
              </tr>
            )}

            {data.map((item) => (
              <tr
                key={item._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Doctor */}
                <td className="p-4 font-medium text-gray-800">
                  {item.doctorDetail?.userName || "-"}
                  {/* <div className="text-xs text-gray-500">
                    {item.doctorDetail?.specialization}
                  </div> */}
                </td>

                {/* Patient */}
                <td className="p-4 text-gray-700">
                  {item.patientDetail?.userName}
                </td>

                {/* Appointment Date */}
                <td className="p-4 text-gray-600">
                  {new Date(item?.createdAt).toLocaleDateString()}
                </td>

                {/* PDF */}
                <td className="p-4 text-center space-x-3">
                  {/* View */}
                  <a
                    href={item.prescriptionpdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-4 py-1.5 rounded-full bg-green-600 text-white text-sm font-semibold hover:bg-green-500"
                  >
                    View
                  </a>

                  {/* Download */}
                  <button
                    onClick={() => handleDownload(item.prescriptionpdf)}
                    className="inline-flex px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Perception;
