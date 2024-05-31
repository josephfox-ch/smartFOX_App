export const formatDate = (date) => {
  return date ? new Date(date).toISOString().split("T")[0] : "";
};

export const formatNumber = (num) => {
  if (num !== "N/A" && !isNaN(num)) {
    const formatted = parseFloat(num).toFixed(3);
    return formatted.endsWith("00") ? parseFloat(num).toFixed(1) : formatted;
  }
  return num;
};
