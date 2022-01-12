import React from "react";

interface LabelValueFieldProps {
  label: string;
  value?: string;
  children?: React.ReactNode;
}

const LabelValueField: React.FC<LabelValueFieldProps> = ({
  label,
  value,
  children,
}) => {
  return (
    <div className="ms-2 me-auto">
      <div className="fw-bold">{label}</div>
      {value ?? children}
    </div>
  );
};

export default LabelValueField;
