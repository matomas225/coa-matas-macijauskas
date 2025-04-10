import { useForm } from "react-hook-form";

export const useFormWithErrorHandling = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  const getErrorMessage = (fieldName: string): string | undefined => {
    return errors[fieldName]?.message as string | undefined;
  };

  return {
    register,
    handleSubmit,
    errors,
    getValues,
    getErrorMessage,
    isSubmitting,
  };
};
