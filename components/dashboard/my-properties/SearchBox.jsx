const SearchBox = ({ value, onChange }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onChange(e.target.value, true);
    }
  };

  return (
    <form className="d-flex flex-wrap align-items-center my-2" onSubmit={e => e.preventDefault()}>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search "
        aria-label="Search"
        value={value}
        onChange={e => onChange(e.target.value, false)}
        onKeyDown={handleKeyDown}
      />
      <button className=" my-2 my-sm-0" type="submit" tabIndex={-1} style={{pointerEvents:'none',background:'none',border:'none'}}>
        <span className="flaticon-magnifying-glass"></span>
      </button>
    </form>
  );
};

export default SearchBox;
