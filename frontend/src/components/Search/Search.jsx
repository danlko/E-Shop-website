function Search({ onSearch }) {
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      if (onSearch) {
        onSearch(e.target.value);
      }
    }
  };

  return (
    <div className="input-group" style={{ maxWidth: '300px' }}>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Search;