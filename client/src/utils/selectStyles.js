const customStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 40,
    marginBottom: "10px",
    border: state.isFocused ? "none" : "1px solid #ced4da",
    boxShadow: state.isFocused ? "0 0 0 1px #6366f1" : "none",
    borderRadius: 0,
    backgroundColor: "#e7eefe",
    "&:hover": {
      borderColor: state.isFocused ? "#6366f1" : "#a8a8a8",
    },
    color: "#000000",
    ".dark &": {
      borderColor: state.isFocused ? "#6366f1" : "#4b5563",
      backgroundColor: "#e7eefe",
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 4,
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: 4,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0px 10px",
    ".dark &": {
      color: "#000000",
    },
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: "#000000",
    ".dark &": {
      color: "#ffffff",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    border: "1px solid #ced4da",
    backgroundColor: "#ffffff",
    ".dark &": {
      borderColor: "#4b5563",
      backgroundColor: "#1f2937",
    },
  }),
  menuList: (base) => ({
    ...base,
    borderRadius: 0,
    backgroundColor: "#ffffff",
    ".dark &": {
      backgroundColor: "#1f2937",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#6366f1"
      : state.isFocused
      ? "#e0e7ff"
      : "#ffffff",
    color: state.isSelected ? "#ffffff" : "#000000",
    ".dark &": {
      backgroundColor: state.isSelected
        ? "#4f46e5"
        : state.isFocused
        ? "#515764"
        : "#1f2937",
      color: state.isSelected ? "#ffffff" : "#ffffff",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#000000",
  }),
};

export default customStyles;
