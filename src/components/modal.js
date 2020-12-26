import "./modal.css";

const Modal = ({ handleClose, children }) => {
  
    return (
      <div className="modal" >
        <section className="modal-main">
          {children}
          <button id="closeCreateModal" onClick={handleClose}>Close Create Contact</button>
        </section>
      </div>
    );
  };


export default Modal