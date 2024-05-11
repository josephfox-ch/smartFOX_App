import React from "react";
import Select from "react-select";
import CountryFlag from "react-country-flag";
import countries from "i18n-iso-countries";
import englishCountries from "i18n-iso-countries/langs/en.json";
import customStyles from "../../utils/selectStyles";

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

const filterOption = ({ data }, inputValue) =>
  data.name.includes(inputValue.toLowerCase());

const defaultValue = countryOptions.find((option) => option.value === "CH");

const CountrySelect = ({ onChange }) => (
  <Select
    options={countryOptions}
    styles={customStyles}
    defaultValue={defaultValue}
    placeholder="Select a country..."
    onChange={onChange}
    filterOption={filterOption}
  />
);

export default CountrySelect;
