const Filtering = ({ value, onChange }) => {
  return (
    <select className="selectpicker show-tick form-select c_select" value={value} onChange={e => onChange(e.target.value)}>
      <option value="Recent">Recent</option>
      <option value="Old Review">Old Review</option>
    </select>
  );
};

export default Filtering;
