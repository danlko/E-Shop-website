function ErrorMessage({ errors }) {
  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <div
      className="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <h5 className="alert-heading">Please fix the following errors:</h5>
      <ul className="mb-0">
        {Object.entries(errors).map(([field, error]) => (
          <li key={field}>
            <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{" "}
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ErrorMessage;
