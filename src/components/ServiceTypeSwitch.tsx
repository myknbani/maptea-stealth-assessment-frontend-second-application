import { FormControlLabel, Switch } from '@mui/material';

interface ServiceTypeSwitchProps {
  serviceType: string;
  value: string[];
  onChange: (newValue: string[]) => void;
}

export function ServiceTypeSwitch({ serviceType, value, onChange }: ServiceTypeSwitchProps) {
  const isChecked = value.includes(serviceType);

  const handleToggle = (checked: boolean) => {
    if (checked) {
      onChange([...value, serviceType]);
    } else {
      onChange(value.filter((serviceType) => serviceType !== serviceType));
    }
  };

  return (
    <FormControlLabel
      control={<Switch checked={isChecked} onChange={(e) => handleToggle(e.target.checked)} />}
      label={serviceType}
    />
  );
}
