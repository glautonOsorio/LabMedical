import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Patient } from "../../Services/Patients/Patient.service";
import { Appointment } from "../../Services/Appoitments/Appoitments.service";
import { Exams } from "../../Services/Exams/Exams.service";
import "./Patient.Record.css";

const PatientRecords = () => {
  const [patient, setPatient] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [exams, setExams] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const GetPatient = async () => {
        await Patient.GetID(params.id).then((data) => {
          setPatient(data);
        });
      };
      const getAppointment = async () => {
        await Appointment.GetPatientId(params.id).then((data) => {
          setAppointments(data);
        });
      };
      const getExam = async () => {
        await Exams.GetPatientId(params.id).then((data) => {
          setExams(data);
        });
      };
      GetPatient();
      getAppointment();
      getExam();
    }
  }, []);

  return (
    <main className="patientRecordsContainer">
      {patient && (
        <div className="patientRecordsContent" key={patient.id}>
          <h1> {patient.name} </h1>
          <span>Convênio: {patient.insurance} </span>
          <span>Telefone: {patient.emergency} </span>
          <span>Alergia: {patient.allergies} </span>
          <span>Cuidado Especifico: {patient.specificCare} </span>
        </div>
      )}
      <div className="patientRecordsContent">
        <h1>Consultas</h1>
        {appointments &&
          appointments.map((appointment) => {
            return (
              <div className="patientRecordsContent" key={appointment.id}>
                <div className=" PatientRecordsRow">
                  <h2>Motivo da Consulta: {appointment.reason}</h2>
                  <Link
                    className="LinkPatientRecord"
                    to={`/appointment/${appointment.id}`}
                  >
                    Editar
                  </Link>
                </div>
                <span>Descrição:</span>
                <p> {appointment.description}</p>
                <span>Receita prescrevida:</span>
                <p> {appointment.recipe} </p>
                <p> {appointment.dosage} </p>
                <div>
                  <span>Data da Consulta:{appointment.date}</span>
                  <span>Horário da Consulta:{appointment.time}</span>
                </div>
              </div>
            );
          })}
      </div>
      <div className="patientRecordsContent">
        <h1>Exames</h1>
        {exams &&
          exams.map((exam) => {
            return (
              <div className="patientRecordsContent" key={exam.id}>
                <div className=" PatientRecordsRow">
                  <h2>{exam.lab}</h2>
                  <Link className="LinkPatientRecord" to={`/exams/${exam.id}`}>
                    Editar
                  </Link>
                </div>
                <span>{exam.name}</span>
                <span>Tipo do Exame:{exam.type}</span>
                <span>Resultado:</span>
                <p>{exam.result}</p>
                <div>
                  <span>Data do Exame:{exam.examData}</span>
                  <span>Horário do Exame:{exam.time}</span>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default PatientRecords;
