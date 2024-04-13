import React from "react";
import Select from "react-select";
import CountryFlag from "react-country-flag";
import countries from "i18n-iso-countries";
import englishCountries from "i18n-iso-countries/langs/en.json";

countries.registerLocale(englishCountries);

const countryOptions = Object.entries(
  countries.getNames("en", { select: "official" })
).map(([code, name]) => ({
  value: code,
  label: (
    <div style={{ display: "flex", alignItems: "center" }}>
      <CountryFlag
        countryCode={code}
        svg
        style={{ width: "20px", marginRight: "10px" }}
      />
      {name}
    </div>
  ),
  name: name.toLowerCase(),
}));

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

const filterOption = ({ data }, inputValue) =>
  data.name.includes(inputValue.toLowerCase());

const CountrySelect = ({ onChange }) => (
  <Select
    options={countryOptions}
    styles={customStyles}
    placeholder="Select a country..."
    onChange={onChange}
    filterOption={filterOption}
  />
);

export default CountrySelect;
