import React from "react";
import Select from "react-select";
import moment from "moment-timezone";
import customStyles from "../../utils/selectStyles";

const timezoneOptions = moment.tz.names().map((zone) => {
  const offset = moment.tz(zone).format("Z");
  return {
    value: zone,
    label: `${zone} (GMT${offset})`,
  };
});

const defaultValue = timezoneOptions.find(
  (option) => option.value === "Europe/Zurich"
);

const TimeZoneSelect = ({ value, onChange }) => (
  <Select
    options={timezoneOptions}
    defaultValue={defaultValue}
    value={timezoneOptions.find((option) => option.value === value)}
    placeholder="Select a timezone..."
    onChange={onChange}
    styles={customStyles}
    classNamePrefix="react-select"
  />
);

export default TimeZoneSelect;
