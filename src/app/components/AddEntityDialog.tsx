import type { FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export type AddEntityField = {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  type?: "text" | "email" | "tel" | "number";
  options?: { label: string; value: string }[];
};

export function AddEntityDialog({
  open,
  title,
  description,
  fields,
  submitLabel = "Lưu",
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  title: string;
  description: string;
  fields: AddEntityField[];
  submitLabel?: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: Record<string, string>) => void;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      fields.map(field => [field.name, String(formData.get(field.name) ?? "").trim()]),
    );

    onSubmit(values);
    event.currentTarget.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {fields.map(field => (
              <label key={field.name} className="grid gap-1.5 text-[12px] font-semibold text-gray-600">
                <span>{field.label}</span>
                {field.options ? (
                  <select
                    name={field.name}
                    defaultValue={field.defaultValue}
                    required={field.required}
                    className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-[12px] text-gray-700 outline-none focus:border-blue-300 dark:bg-input/30"
                  >
                    {field.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={field.name}
                    type={field.type ?? "text"}
                    defaultValue={field.defaultValue}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-[12px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-300 dark:bg-input/30"
                  />
                )}
              </label>
            ))}
          </div>

          <DialogFooter>
            <button
              type="button"
              className="rounded-lg border border-gray-200 px-4 py-2 text-[12px] font-medium text-gray-600 hover:bg-gray-50"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </button>
            <button type="submit" className="app-primary-action rounded-lg px-4 py-2 text-[12px] font-medium">
              {submitLabel}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
