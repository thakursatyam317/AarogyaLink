import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Prescription = () => {
  const [diagnosis, setDiagnosis] = useState([
    { name: "", icd: "", namaste: "" },
  ]);
  const [medicines, setMedicines] = useState([
    { name: "", meal: "", dosage: "" },
  ]);
  const [checkups, setCheckups] = useState([""]);

  const addDiagnosis = () =>
    setDiagnosis([...diagnosis, { name: "", icd: "", namaste: "" }]);
  const addMedicine = () =>
    setMedicines([...medicines, { name: "", meal: "", dosage: "" }]);
  const addCheckup = () => setCheckups([...checkups, ""]);

  const handleDiagnosisChange = (i, f, v) => {
    const u = [...diagnosis];
    u[i][f] = v;
    setDiagnosis(u);
  };

  const handleMedicineChange = (i, f, v) => {
    const u = [...medicines];
    u[i][f] = v;
    setMedicines(u);
  };

  const handleCheckupChange = (i, v) => {
    const u = [...checkups];
    u[i] = v;
    setCheckups(u);
  };

  return (
    <>
      <div className="flex bg-gray-200 min-h-screen">
        {/* LEFT SIDEBAR */}
        <div className="w-[20%] h-screen bg-gray-800 fixed text-white p-5">
          <h1 className="text-3xl font-bold mb-6">Prescription Page</h1>

          <div className="grid gap-4">
            <NavLink to="/doctor/dashboard">Dashboard</NavLink>
            <NavLink to="/doctor/appointments">Appointment</NavLink>
            <NavLink to="/doctor/today-appointment">Today Appointment</NavLink>
            <NavLink to="/doctor/details">Details</NavLink>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="ms-[20%] w-[80%] p-10 mt-10 flex justify-center">
          <div
            className="bg-white p-10 border border-gray-400 rounded-2xl"
            style={{
              width: "794px",
              minHeight: "1123px",
            }}
          >
            {/* TITLE */}
            <h1 className="font-bold text-4xl mb-6 text-center">
              Prescription
            </h1>

            <hr className="border-t-2 border-gray-400 mb-8" />

            {/* DOCTOR DETAILS */}
            <Section title="Doctor Details">
              <Grid2>
                <Item label="Name" value="Dr. Satyam Thakur" />
                <Item label="Email" value="thakursatyam317@gmail.com" />
                <Item label="Contact" value="+91 9754584581" />
                <Item label="Doctor ID" value="12349dtrgyuh123" />
                <Item label="Gender" value="Male" />
              </Grid2>
            </Section>

            {/* PATIENT DETAILS */}
            <Section title="Patient Details">
              <Grid2>
                <Item label="Name" value="Satyam Thakur" />
                <Item label="Email" value="thakursatyam317@gmail.com" />
                <Item label="Contact" value="+91 9754584581" />
                <Item label="Patient ID" value="12349dtrgyuh123" />
                <Item label="Gender" value="Male" />
                <Item label="Age" value="24" />
                <Item label="Address" value="313, Bank Colony, Pipariya" />
                <Item label="Blood Group" value="O+" />
              </Grid2>
            </Section>

            {/* DIAGNOSIS */}
            <Section title="Diagnosis">
              {diagnosis.map((item, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-5 mb-4">
                  <Input
                    placeholder="Diagnosis Name"
                    value={item.name}
                    onChange={(e) =>
                      handleDiagnosisChange(idx, "name", e.target.value)
                    }
                  />
                  <Input
                    placeholder="ICD Code"
                    value={item.icd}
                    onChange={(e) =>
                      handleDiagnosisChange(idx, "icd", e.target.value)
                    }
                  />
                  <Input
                    placeholder="NAMASTE Code"
                    value={item.namaste}
                    onChange={(e) =>
                      handleDiagnosisChange(idx, "namaste", e.target.value)
                    }
                  />
                </div>
              ))}
              <div className="flex justify-between items-center  mt-3">
                <Button label="+ Add More" onClick={addDiagnosis}  />

                <Button
                  label="Remove"
                  type="remove"
                  onClick={() => removeDiagnosis(idx)}
                />
              </div>
            </Section>

            {/* MEDICINE */}
            <Section title="Medicines">
              {medicines.map((item, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-5 mb-4">
                  <Input
                    placeholder="Medicine Name"
                    value={item.name}
                    onChange={(e) =>
                      handleMedicineChange(idx, "name", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Before/After Meal"
                    value={item.meal}
                    onChange={(e) =>
                      handleMedicineChange(idx, "meal", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Dosage"
                    value={item.dosage}
                    onChange={(e) =>
                      handleMedicineChange(idx, "dosage", e.target.value)
                    }
                  />
                </div>
              ))}
              <div className="flex justify-between items-center mt-3">
                <Button label="+ Add More" onClick={addMedicine} />

                <Button
                  label="Remove"
                  type="remove"
                  onClick={() => removeMedicine(idx)}
                />
              </div>
            </Section>

            {/* CHECKUP */}
            <Section title="Check-Up">
              {checkups.map((item, idx) => (
                <div key={idx} className="mb-4">
                  <Input
                    placeholder="Next Check-Up Details"
                    full
                    value={item}
                    onChange={(e) => handleCheckupChange(idx, e.target.value)}
                  />
                </div>
                
              ))}
              <div className="flex justify-between items-center mt-3">
                <Button label="+ Add More" onClick={addCheckup} />
              
                <Button
                  label="Remove"
                  type="remove"
                  onClick={() => removeCheckup(idx)}
                />
              </div>
            </Section>

            {/* NEXT APPOINTMENT */}
            <Section title="Next Appointment">
              <input type="date" className="border p-2 rounded w-60" />
            </Section>

            {/* SUBMIT */}
            <div className="text-center mt-8">
              <button className="bg-blue-500 hover:bg-amber-500 px-8 py-3 text-lg rounded-xl">
                Submit Prescription
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* COMPONENTS */

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-blue-900">{title}</h2>
    <div className="h-[2px] bg-blue-900 w-full my-2"></div>
    {children}
    <div className="h-[1px] bg-gray-300 mt-4"></div>
  </div>
);

const Grid2 = ({ children }) => (
  <div className="grid grid-cols-2 gap-3 text-[17px]">{children}</div>
);

const Item = ({ label, value }) => (
  <p>
    <strong>{label}:</strong> {value}
  </p>
);

const Input = ({ placeholder, value, onChange, full }) => (
  <input
    type="text"
    placeholder={placeholder}
    className={`border p-2 rounded ${full ? "w-full" : ""}`}
    value={value}
    onChange={onChange}
  />
);

const Button = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-amber-500"
  >
    {label}
  </button>
);

const removeDiagnosis = (index) => {
  setDiagnosis(diagnosis.filter((_, i) => i !== index));
};

const removeMedicine = (index) => {
  setMedicines(medicines.filter((_, i) => i !== index));
};

const removeCheckup = (index) => {
  setCheckups(checkups.filter((_, i) => i !== index));
};

export default Prescription;
