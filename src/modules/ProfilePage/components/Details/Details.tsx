import { useEffect, useState } from 'react';
import type { User } from '../../../../types/User';
import { DetailsView } from './DetailsView';
import { DetailsEdit } from './DetailsEdit';
import { useSnackbar } from '../../../shared/hooks/useSnackbar';
import { AppSnackbar } from '../../../shared/components/AppSnackbar/AppSnackbar';
import { getMe } from '../../../shared/api/auth';

export const Details = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { snackbar, showSuccess, showError, close } = useSnackbar();

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => {
        showError('Не вдалося завантажити дані користувача');
      });
  }, [showError]);

  if (!user) return <p>Завантаження...</p>;

  return (
    <>
      {isEditing ? (
        <DetailsEdit
          user={user}
          onCancel={() => setIsEditing(false)}
          onSave={(updatedUser) => {
            setUser(updatedUser);
            setIsEditing(false);
            showSuccess('Дані успішно оновлено');
          }}
          onError={() => {
            showError('Помилка оновлення даних');
          }}
        />
      ) : (
        <DetailsView user={user} onEdit={() => setIsEditing(true)} />
      )}

      <AppSnackbar {...snackbar} onClose={close} />
    </>
  );
};
