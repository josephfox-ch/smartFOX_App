import React from "react";
import Select from "react-select";
import moment from "moment-timezone";

const timezoneOptions = moment.tz.names().map((zone) => {
  const offset = moment.tz(zone).format("Z");
  return {
    value: zone,
    label: `${zone} (GMT${offset})`,
  };
});

const customStyles = {
  control: (base) => ({
    ...base,
    minHeight: 40,
    marginBottom: "10px",
    border: "1px solid #ced4da",
    borderRadius: 5,
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
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
};

const TimeZoneSelect = ({ value, onChange }) => (
  <Select
    options={timezoneOptions}
    value={timezoneOptions.find((option) => option.value === value)}
    placeholder="Select a timezone..."
    onChange={onChange}
    styles={customStyles}
  />
);

export default TimeZoneSelect;
