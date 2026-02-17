import { useEffect, useState } from 'react';
import { getMoods, getPurposes, getCategories, getCountries, getWineTypes } from '../api/filters';
import type { FilterItem } from '../../../types/FilterItem';

export const useFilters = () => {
  const [loading, setLoading] = useState(true);

  const [moods, setMoods] = useState<FilterItem[]>([]);
  const [purposes, setPurposes] = useState<FilterItem[]>([]);
  const [categories, setCategories] = useState<FilterItem[]>([]);
  const [countries, setCountries] = useState<FilterItem[]>([]);
  const [wineTypes, setWineTypes] = useState<FilterItem[]>([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [moodsData, purposesData, categoriesData, countriesData, wineTypesData] =
          await Promise.all([
            getMoods(),
            getPurposes(),
            getCategories(),
            getCountries(),
            getWineTypes(),
          ]);

        setMoods(moodsData);
        setPurposes(purposesData);
        setCategories(categoriesData);
        setCountries(countriesData);
        setWineTypes(wineTypesData);
      } catch (error) {
        console.error('Failed to load filters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  return {
    moods,
    purposes,
    categories,
    countries,
    wineTypes,
    loading,
  };
};
