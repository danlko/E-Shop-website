function PrimaryButton({ text, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      className={`btn btn-dark px-4 rounded-pill ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;
