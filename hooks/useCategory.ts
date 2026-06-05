import { useGetCategoriesQuery } from '@/state/services/public/publicService';

export const useCategory = () => {
  const {
    data: categories = [],
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetCategoriesQuery();

  const getCategoryLabel = (value: string) => {
    return (
      categories.find((category) => category.value === value)?.label || value
    );
  };

  const getCategory = (value: string) => {
    return categories.find((category) => category.value === value);
  };

  return {
    categories,
    categoryLoading,
    getCategory,
    getCategoryLabel,
  };
};
