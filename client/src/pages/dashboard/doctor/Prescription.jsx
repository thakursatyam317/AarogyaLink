import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import authAxios from "../../../utils/authAxios";
import { useAuth } from "../../../contexts/authContext";
import { allDiagnoses } from "../../../utils/allPresciption";
import { allMedicines } from "../../../utils/allPresciption";

const Prescription = () => {
  const { patientID } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const [status, setStatus] = useState("");
  const [diagnosis, setDiagnosis] = useState([{ name: "" }]);
  const [medicines, setMedicines] = useState([
    { name: "", meal: "", dosage: "" },
  ]);
  const [checkups, setCheckups] = useState([""]);
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [medicineSuggestions, setMedicineSuggestions] = useState({});
  // add / remove helpers (unchanged)
  const addDiagnosis = () => setDiagnosis([...diagnosis, { name: "" }]);
  const addMedicine = () =>
    setMedicines([...medicines, { name: "", meal: "", dosage: "" }]);
  const addCheckup = () => setCheckups([...checkups, ""]);
  const removeDiagnosis = (index) =>
    setDiagnosis(diagnosis.filter((_, i) => i !== index));
  const removeMedicine = (index) =>
    setMedicines(medicines.filter((_, i) => i !== index));
  const removeCheckup = (index) =>
    setCheckups(checkups.filter((_, i) => i !== index));

  // field change handlers
  // const handleDiagnosisChange = (i, field, value) => {
  //   const updated = [...diagnosis];
  //   updated[i][field] = value;
  //   setDiagnosis(updated);
  // };

  const handleDiagnosisChange = (idx, field, value) => {
    const updated = [...diagnosis];
    updated[idx][field] = value;
    setDiagnosis(updated);

    // 🔥 Frontend filtering
    if (field === "name" && value.length > 0) {
      const filtered = allDiagnoses.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase()),
      );

      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleMedicineChange = (i, field, value) => {
    const updated = [...medicines];
    updated[i][field] = value;
    setMedicines(updated);

    // 🔥 suggestions only for name
    if (field === "name") {
      if (value.length > 0) {
        const filtered = allMedicines
          .filter((m) => m.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 5);

        setMedicineSuggestions((prev) => ({
          ...prev,
          [i]: filtered,
        }));
      } else {
        setMedicineSuggestions((prev) => ({
          ...prev,
          [i]: [],
        }));
      }
    }
  };

  const handleCheckupChange = (i, value) => {
    const updated = [...checkups];
    updated[i] = value;
    setCheckups(updated);
  };

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      try {
        const response = await authAxios.get(
          `/prescription/getprescription/:${patientID}`,
        );
        console.log("patientID  ", patientID);
        const fetched = response.data?.data?.[0] ?? null;
        setPrescriptionData(fetched);

        // Populate local form state if you want to edit existing prescription:
        if (fetched) {
          if (Array.isArray(fetched.diagnosis) && fetched.diagnosis.length)
            setDiagnosis(fetched.diagnosis);
          if (Array.isArray(fetched.medicines) && fetched.medicines.length)
            setMedicines(fetched.medicines);
          if (Array.isArray(fetched.checkups) && fetched.checkups.length)
            setCheckups(fetched.checkups);
        }

        console.log("Fetched prescription:", fetched);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };

    if (patientID) fetchPrescriptionData();
  }, [patientID]);

  const handleSave = async () => {
    try {
      setLoading(true);

      // pick patient and doctor details from fetched data (or from separate state if you have)
      const patientDetail = prescriptionData?.patientDetail ?? null;
      const doctorDetail = prescriptionData?.doctorDetail ?? null;

      // Build a single object body (not an array)
      const body = {
        diagnosis,
        medicines,
        checkups,
        patientDetail,
        doctorDetail,
      };

      console.log("Sending Data:", body);

      const response = await authAxios.post(
        `/prescription/createprescription`,
        body,
      );
      const statusChangeResponse = await authAxios.post(
        `/prescription/updateappointmentstatus`,
        {
          appointmentId: prescriptionData?.appointmentId,
          status: "completed",
          body: body,
        },
      );
      console.log("Status Change Response:", statusChangeResponse);
      console.log("PDF:", response.data);
      console.log("Full Response:", response);
      setTimeout(() => {
        navigate("/");
      }, 2000);
      // show success toast / navigate / set state as needed
    } catch (error) {
      console.log("The PDF is not generated", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex bg-gray-200 min-h-screen">
        {/* DESKTOP SIDEBAR */}
        <div className="w-full md:w-[20%] h-auto md:h-screen bg-gray-800 md:fixed text-white">
          <div className="mt-20 ms-5">
            <h1 className="text-xl md:text-2xl font-bold">
              Welcome {authUser.userName}
            </h1>

            <div className="grid mt-6 md:mt-10 space-y-3 md:space-y-4">
              <NavLink
                to="/doctor/dashboard"
                className="hover:bg-gray-700 p-3 rounded-xl text-lg"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/doctor/dashboard/appointment"
                className="hover:bg-gray-700 p-3 rounded-xl text-lg"
              >
                Appointments
              </NavLink>

              <NavLink className="hover:bg-gray-700 p-3 rounded-xl text-lg">
                Today Appointment
              </NavLink>

              <NavLink
                to="/doctor/dashboard/details"
                className="hover:bg-gray-700 p-3 rounded-xl text-lg"
              >
                Details
              </NavLink>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="md:ms-[20%] w-full md:w-[80%] p-4 md:p-10 mt-16 md:mt-10 flex justify-center">
          <div
            className="bg-white p-4 md:p-10 border border-gray-400 rounded-2xl w-full max-w-[794px]"
            style={{ width: "794px", minHeight: "1123px" }}
          >
            {/* MOBILE TOP BAR */}
            <div className="md:hidden w-full bg-gray-800 text-white p-4 fixed top-0 z-50">
              <h1 className="text-lg font-bold text-center">Prescription</h1>
            </div>

            <div className="  text-white p-4  top-10">
              <h1 className="text-4xl text-gray-800 font-bold text-center">
                Prescription
              </h1>
            </div>

            <hr className="border-t-2 border-gray-400 mb-8" />

            {/* DOCTOR & PATIENT DETAILS (read-only from fetched data) */}
            <Section title="Doctor Details">
              <Grid2>
                <Item
                  label="Name"
                  value={prescriptionData?.doctorDetail?.userName || "N/A"}
                />
                <Item
                  label="Email"
                  value={prescriptionData?.doctorDetail?.email || "N/A"}
                />
                <Item
                  label="Phone"
                  value={prescriptionData?.doctorDetail?.phoneNumber || "N/A"}
                />
                <Item
                  label="Specialization"
                  value={
                    prescriptionData?.doctorDetail?.specialization || "N/A"
                  }
                />
                <Item
                  label="Doctor ID"
                  value={prescriptionData?.doctorDetail?.doctorID || "N/A"}
                />
              </Grid2>
            </Section>

            <Section title="Patient Details">
              <Grid2>
                <Item
                  label="Name"
                  value={prescriptionData?.patientDetail?.userName || "N/A"}
                />
                <Item
                  label="Email"
                  value={prescriptionData?.patientDetail?.email || "N/A"}
                />
                <Item
                  label="Phone"
                  value={prescriptionData?.patientDetail?.phoneNumber || "N/A"}
                />
                <Item
                  label="Gender"
                  value={prescriptionData?.patientDetail?.gender || "N/A"}
                />
                <Item
                  label="patient ID"
                  value={prescriptionData?.patientDetail?.userID || "N/A"}
                />
              </Grid2>
            </Section>

            {/* DIAGNOSIS, MEDICINES, CHECKUPS (form UI unchanged) */}
            <Section title="Diagnosis">
              {diagnosis.map((item, idx) => (
                <div key={idx} className="w-full mb-4 relative">
                  <div className="flex">
                    <Input
                      placeholder="Diagnosis"
                      value={item.name}
                      onChange={(e) =>
                        handleDiagnosisChange(idx, "name", e.target.value)
                      }
                      className="w-[80%]"
                    />

                    <button
                      className="bg-red-500 text-white ms-4 w-10 h-10 rounded-full"
                      onClick={() => removeDiagnosis(idx)}
                    >
                      –
                    </button>
                  </div>

                  {/* 🔥 Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="absolute bg-white border w-[80%] mt-1 rounded shadow z-10 max-h-40 overflow-y-auto">
                      {suggestions.map((s, i) => (
                        <div
                          key={i}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleDiagnosisChange(idx, "name", s);
                            setSuggestions([]);
                          }}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Button label="+ Add Diagnosis" onClick={addDiagnosis} />
            </Section>

            <Section title="Medicines">
              {medicines.map((item, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-5 mb-4">
                  {/* 🔥 Wrap with relative */}
                  <div className="relative">
                    <Input
                      placeholder="Medicine Name"
                      value={item.name}
                      onChange={(e) =>
                        handleMedicineChange(idx, "name", e.target.value)
                      }
                    />

                    {/* 🔥 Suggestions dropdown */}
                    {medicineSuggestions[idx]?.length > 0 && (
                      <div className="absolute bg-white border w-full mt-1 rounded shadow z-10 max-h-40 overflow-y-auto">
                        {medicineSuggestions[idx].map((m, i) => (
                          <div
                            key={i}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              handleMedicineChange(idx, "name", m);
                              setMedicineSuggestions((prev) => ({
                                ...prev,
                                [idx]: [],
                              }));
                            }}
                          >
                            {m}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <select
                    value={item.meal}
                    onChange={(e) =>
                      handleMedicineChange(idx, "meal", e.target.value)
                    }
                    className="border rounded mx-5 px-3 py-2 w-full"
                  >
                    <option value="">Select Meal</option>
                    <option value="Before Meal">Before Meal</option>
                    <option value="After Meal">After Meal</option>
                  </select>

                  <Input
                    placeholder="Dosage"
                    value={item.dosage}
                    onChange={(e) =>
                      handleMedicineChange(idx, "dosage", e.target.value)
                    }
                    className="mx-5"
                  />

                  <button
                    className="bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full mt-1"
                    onClick={() => removeMedicine(idx)}
                  >
                    –
                  </button>
                </div>
              ))}

              <Button label="+ Add Medicine" onClick={addMedicine} />
            </Section>

            <Section title="Check-Up">
              {checkups.map((item, idx) => (
                <div key={idx} className="grid grid-cols-6 gap-4 mb-4">
                  <div className="col-span-5">
                    <Input
                      placeholder="Next Check-Up Details"
                      full
                      value={item}
                      onChange={(e) => handleCheckupChange(idx, e.target.value)}
                    />
                  </div>
                  <button
                    className="bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full mt-1"
                    onClick={() => removeCheckup(idx)}
                  >
                    –
                  </button>
                </div>
              ))}

              <Button label="+ Add Checkup" onClick={addCheckup} />
            </Section>

            <Section title="Next Appointment">
              <input
                type="date"
                className="border p-2 rounded w-60"
                min={new Date().toISOString().split("T")[0]}
              />
            </Section>

            <div className="text-center mt-8">
              <button
                className="bg-blue-600 px-8 py-3 text-lg rounded-xl text-white hover:bg-amber-500"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Submit Prescription"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prescription;

/* ========== COMPONENTS ========== */
const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-blue-900">{title}</h2>
    <div className="h-[2px] bg-blue-900 w-full my-2"></div>
    {children}
    <div className="h-[1px] bg-gray-300 mt-4"></div>
  </div>
);

const Grid2 = ({ children }) => (
  <div className="grid grid-cols-2 gap-3">{children}</div>
);

const Item = ({ label, value }) => (
  <p className="text-lg">
    <strong>{label}: </strong> {value}
  </p>
);

const Input = ({ placeholder, value, onChange, full, className }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`border p-2 rounded ${full ? "w-full" : ""} ${className}`}
  />
);

const Button = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-amber-500 mt-3"
  >
    {label}
  </button>
);
