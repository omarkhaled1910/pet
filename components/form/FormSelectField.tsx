import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface FormSelectFieldProps {
  value: string;
  onValueChange: (value: string) => void;
  onBlur: () => void;
  placeholder?: string;
  options: string[];
  id?: string;
  name?: string;
}

export const FormSelectField = ({
  value,
  onValueChange,
  onBlur,
  placeholder,
  options,
  id,
  name,
}: FormSelectFieldProps) => {
  return (
    <Select name={name} value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id} className="w-full" onBlur={onBlur}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
