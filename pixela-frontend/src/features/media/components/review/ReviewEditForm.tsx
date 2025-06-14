"use client";

import { useForm, Controller } from 'react-hook-form';
import { FiStar } from 'react-icons/fi';
import { ReviewEditFormProps } from '@/features/media/types/reviews';

const STYLES = {
  container: "mt-4 space-y-4",
  stars: {
    container: "flex items-center gap-2",
    button: "text-2xl"
  },
  textarea: "w-full bg-[#1a1a1a]/70 border border-white/10 rounded-lg p-3 text-white resize-none min-h-[100px] focus:outline-none focus:border-pixela-accent/40",
  buttons: {
    container: "flex justify-end gap-2",
    save: "px-4 py-2 text-sm bg-pixela-accent text-white rounded-lg hover:bg-pixela-accent/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
    cancel: "px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
  },
  error: "text-sm italic text-pixela-accent"
} as const;

interface EditFormData {
  text: string;
  rating: number;
}

/**
 * Componente que muestra el formulario de edición de una reseña
 * @param {ReviewEditFormProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de formulario de edición
 */
export const ReviewEditForm = ({
  editText,
  editRating,
  onSave,
  onCancel
}: ReviewEditFormProps) => {
  const { register, handleSubmit, control, formState: { errors, isSubmitting, isValid } } = useForm<EditFormData>({
    defaultValues: {
      text: editText,
      rating: editRating
    },
    mode: 'onChange'
  });

  const handleSave = (data: EditFormData) => {
    onSave(data.text, data.rating);
  };
  
  return (
    <form onSubmit={handleSubmit(handleSave)} className={STYLES.container}>
      <Controller
        name="rating"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className={STYLES.stars.container}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => onChange(star * 2)}
                className={STYLES.stars.button}
              >
                <FiStar
                  className={`w-6 h-6 ${
                    value >= star * 2 ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      />
      <textarea
        {...register('text', {
          maxLength: { value: 600, message: `La reseña no puede superar los 600 caracteres.` }
        })}
        className={STYLES.textarea}
        placeholder="Escribe tu reseña..."
      />
      {errors.text && <p className={STYLES.error}>{errors.text.message}</p>}
      <div className={STYLES.buttons.container}>
        <button
          type="submit"
          className={STYLES.buttons.save}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={STYLES.buttons.cancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};