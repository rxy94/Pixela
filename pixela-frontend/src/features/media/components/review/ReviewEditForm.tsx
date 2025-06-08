"use client";

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
    save: "px-4 py-2 text-sm bg-pixela-accent text-white rounded-lg hover:bg-pixela-accent/80 transition-colors duration-200",
    cancel: "px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
  }
} as const;

/**
 * Componente que muestra el formulario de edición de una reseña
 * @param {ReviewEditFormProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de formulario de edición
 */
export const ReviewEditForm = ({
  editText,
  editRating,
  onTextChange,
  onRatingChange,
  onSave,
  onCancel
}: ReviewEditFormProps) => (
  <div className={STYLES.container}>
    <div className={STYLES.stars.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRatingChange(star * 2)}
          className={STYLES.stars.button}
        >
          <FiStar
            className={`w-6 h-6 ${
              editRating >= star * 2 ? 'text-yellow-400' : 'text-gray-400'
            }`}
          />
        </button>
      ))}
    </div>
    <textarea
      value={editText}
      onChange={(e) => onTextChange(e.target.value)}
      className={STYLES.textarea}
      placeholder="Escribe tu reseña..."
    />
    <div className={STYLES.buttons.container}>
      <button
        onClick={onSave}
        className={STYLES.buttons.save}
      >
        Guardar
      </button>
      <button
        onClick={onCancel}
        className={STYLES.buttons.cancel}
      >
        Cancelar
      </button>
    </div>
  </div>
); 