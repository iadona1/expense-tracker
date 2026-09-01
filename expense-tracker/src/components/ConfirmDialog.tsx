import "../styles/ConfirmDialog.css";
import type {ConfirmDialogProps} from "../types/confirmDialog";



export default function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <p className="dialog__message">{message}</p>
        <div className="dialog__actions">
          <button className="dialog__cancel" onClick={onCancel}>Cancel</button>
          <button className="dialog__confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}