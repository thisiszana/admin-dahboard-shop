const ConfirmationModal = ({ title, content, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={onConfirm}>Yes, delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};
