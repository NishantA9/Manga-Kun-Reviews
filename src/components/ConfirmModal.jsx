import React from "react";

export default function ConfirmModal({ open, title, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3>Confirm delete</h3>
        <p>Are you sure you want to delete <strong>{title}</strong>?</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 }}>
          <button className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn-red" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
