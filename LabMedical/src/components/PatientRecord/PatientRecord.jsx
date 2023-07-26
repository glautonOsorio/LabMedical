import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Patient } from "../../Services/Patients/Patient.service";
import { Appointment } from "../../Services/Appoitments/Appoitments.service";
import { Exams } from "../../Services/Exams/Exams.service";

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
    <main>
      {patient && (
        <div key={patient.id}>
          <h1> {patient.name} </h1>
          <span>Convênio:{patient.insurance} </span>
          <span>Convênio:{patient.emergency} </span>
          <span>Convênio:{patient.allergies} </span>
          <span>Convênio:{patient.specificCare} </span>
        </div>
      )}
      <div>
        <h1>Consultas</h1>
        {appointments &&
          appointments.map((appointment) => {
            return (
              <div key={appointment.id}>
                <div>
                  <h2>Motivo da Consulta: {appointment.reason}</h2>
                  <Link to={`/appointment/${appointment.id}`}>Editar</Link>
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
      <div>
        <h1>Exames</h1>
        {exams &&
          exams.map((exam) => {
            return (
              <div key={exam.id}>
                <div>
                  <h2>{exam.lab}</h2>
                  <Link to={`/exams/${exam.id}`}>Editar</Link>
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
