import { useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";

const HealthRecordEditor = ({
  recordName,
  recordToEdit,
  setRecordToEdit,
  updateHealtRecord,
}) => {
  const [vaccName, setVaccName] = useState(recordToEdit.name);
  const [vaccDate, setVaccDate] = useState(recordToEdit.get_date);
  const [expDate, setExpDate] = useState(recordToEdit.exp_date);
  const [vaccComment, setVaccComment] = useState(recordToEdit.comment);

  const handleVaccSubmit = (e) => {
    e.preventDefault();

    const editedHealthRecord = {
      vaccName,
      vaccDate,
      expDate,
      vaccComment,
    };

    updateHealtRecord(editedHealthRecord, recordName, recordToEdit._id);
  };

  const recordForm =
    recordName === "vaccination" ? (
      <>
        <div className="vacc-title">
          <PageTitle title="Edit vaccination log" />
        </div>
        <div className="vacc-form-container">
          <form id="vacc-form">
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={vaccName}
              onChange={(e) => setVaccName(e.target.value)}
            />
            <label>Date</label>
            <input
              type="date"
              name="get_date"
              value={vaccDate}
              onChange={(e) => setVaccDate(e.target.value)}
            />
            <label>Expiration date</label>
            <input
              name="exp_date"
              type="date"
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
            />
            <label>Comment</label>
            <textarea
              name="comment"
              rows="4"
              value={vaccComment}
              onChange={(e) => setVaccComment(e.target.value)}
            />
            <button
              className="save-btn-vacc"
              type="submit"
              onClick={handleVaccSubmit}
            >
              SAVE
            </button>
            <button
              className="cancel-btn-vacc"
              type="button"
              onClick={() => setRecordToEdit(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </>
    ) : (
      <h1>HELLO</h1>
    );

  return <div>{recordForm}</div>;
};

export default HealthRecordEditor