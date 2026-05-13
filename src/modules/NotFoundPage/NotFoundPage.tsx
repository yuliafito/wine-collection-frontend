import { NotFound } from '../shared/components/NotFound';

export const NotFoundPage = () => (
  <NotFound
    title="Упс, схоже цієї сторінки не існує"
    imageSrc="/images/page-not-found.png"
    alt="Page was not found"
  />
);
