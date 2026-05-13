import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsList } from '../shared/components/ProductList';
import { DropDown } from '../shared/components/DropDown/DropDown';
import { Loader } from '../shared/components/Loader';
import { Filters } from '../shared/components/Filters';
import { PageState } from '../shared/components/PageState';
import { useProducts } from '../shared/hooks/useProducts';
import type { ProductsParams } from '../../types/ProductsParams';

import { Chip, IconButton, InputAdornment, Pagination, Stack, TextField } from '@mui/material';
import { useTheme, useMediaQuery, Button, Drawer } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import styles from './ProductsPage.module.scss';
import { useFilters } from '../shared/hooks/useFilters';

const buildProductsParams = (searchParams: URLSearchParams): ProductsParams => {
  return {
    query: searchParams.get('query') || undefined,
    sort: searchParams.get('sort') || 'price_asc',
    page: Number(searchParams.get('page') || 1),
    perPage: Number(searchParams.get('perPage') || 8),

    mood: searchParams.getAll('mood'),
    wine_type: searchParams.getAll('wine_type'),
    country: searchParams.getAll('country'),
    purpose: searchParams.getAll('purpose'),
    category: searchParams.getAll('category'),

    priceMin: searchParams.get('priceMin') || undefined,
    priceMax: searchParams.get('priceMax') || undefined,
  };
};

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [wineOpen, setWineOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
  const [searchValue, setSearchValue] = useState(params.query ?? '');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const productsParams = useMemo(() => buildProductsParams(searchParams), [searchParams]);

  const { products, total, loading: productsLoading, error } = useProducts(productsParams);

  const {
    moods,
    purposes,
    categories,
    countries,
    wineTypes,
    loading: filtersLoading,
  } = useFilters();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const page = Number(searchParams.get('page') || 1);
  const perPage = Number(searchParams.get('perPage') || 8);

  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value === 1) {
      nextParams.delete('page');
    } else {
      nextParams.set('page', String(value));
    }

    setSearchParams(nextParams);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateQuery = useMemo(
    () =>
      debounce((value: string) => {
        const nextParams = new URLSearchParams(searchParams);

        if (value) {
          nextParams.set('query', value);
        } else {
          nextParams.delete('query');
        }

        nextParams.delete('page');
        setSearchParams(nextParams);
      }, 500),
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchValue(params.query ?? '');
  }, [params.query]);

  useEffect(() => {
    return () => {
      updateQuery.cancel();
    };
  }, [updateQuery]);

  const toggleParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const values = params.getAll(key);

    if (values.includes(value)) {
      params.delete(key);
      values.filter((v) => v !== value).forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }

    params.delete('page');
    setSearchParams(params);
  };

  const resetAll = () => {
    setSearchParams({});
  };

  const filterLabelMap = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};

    const fill = (key: string, items: { id: string; name: string }[]) => {
      map[key] = {};
      items.forEach((item) => {
        map[key][item.id] = item.name;
      });
    };

    fill('mood', moods);
    fill('purpose', purposes);
    fill('category', categories);
    fill('country', countries);
    fill('wine_type', wineTypes);

    return map;
  }, [moods, purposes, categories, countries, wineTypes]);

  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');

  const FILTER_KEYS = ['wine_type', 'country', 'mood', 'purpose', 'category'];

  const hasSelectedFilters = FILTER_KEYS.some((key) => searchParams.has(key));

  if (productsLoading || filtersLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <PageState
        type="error"
        message="Щось пішло не так"
        onReload={() => window.location.reload()}
      />
    );
  }

  const hasQuery = Boolean(searchParams.get('query'));
  const hasFilters =
    hasSelectedFilters ||
    Boolean(searchParams.get('priceMin')) ||
    Boolean(searchParams.get('priceMax'));

  const isEmpty = products.length === 0;

  return (
    <section className={styles.products}>
      <div className={styles.products__wrapper}>
        <Breadcrumbs firstPath="Каталог вин" secondPath="" />

        <h1 className={styles.products__header}>Колекція вин</h1>

        <div className={styles.products__container}>
          {!isMobile && (
            <Filters
              wineOpen={wineOpen}
              setWineOpen={setWineOpen}
              countryOpen={countryOpen}
              setCountryOpen={setCountryOpen}
              toggleParam={toggleParam}
            />
          )}

          {isMobile && (
            <Drawer
              anchor="left"
              open={filtersOpen}
              onClose={() => setFiltersOpen(false)}
              PaperProps={{
                sx: {
                  width: '85%',
                  maxWidth: 360,
                  padding: 2,
                },
              }}
            >
              <Filters
                wineOpen={wineOpen}
                setWineOpen={setWineOpen}
                countryOpen={countryOpen}
                setCountryOpen={setCountryOpen}
                toggleParam={toggleParam}
              />
            </Drawer>
          )}

          <div className={styles.products__items}>
            <TextField
              fullWidth
              size="small"
              placeholder="Пошук вина…"
              value={searchValue}
              onChange={(e) => {
                const value = e.target.value;
                setSearchValue(value);
                updateQuery(value);
              }}
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  '&.Mui-focused fieldset': {
                    borderColor: '#7a1e2d',
                  },
                },
                '& .MuiInputBase-input': {
                  fontFamily: '"Playfair Display", "Times New Roman", serif',
                },
                '& .MuiInputBase-input::placeholder': {
                  fontFamily: '"Playfair Display", "Times New Roman", serif',
                  opacity: 0.6,
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchValue ? (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSearchValue('');
                          updateQuery('');
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                },
              }}
            />

            {isMobile && (
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setFiltersOpen(true)}
                sx={{
                  mb: 2,
                  borderRadius: '20px',
                  fontFamily: '"Playfair Display", serif',
                  color: '#7a1e2d',
                  borderColor: '#7a1e2d',
                }}
              >
                Фільтри
              </Button>
            )}

            <div className={styles['products__items-header']}>
              <div className={styles['products__title-wrapper']}>
                <h2 className={styles.products__title}>Вина</h2>

                <p className={styles.products__count}>
                  {total} товар{total !== 1 && 'ів'}
                </p>
              </div>

              <div className={styles['products__drop-downs']}>
                <div className={styles['products__drop-down']}>
                  <DropDown
                    label="Сортувати за:"
                    paramKey="sort"
                    defaultValue="price_asc"
                    options={[
                      { value: 'price_asc', label: 'Збільшення ціни' },
                      { value: 'price_desc', label: 'Зменшення ціни' },
                      { value: 'name_asc', label: 'Назвою товару А-Я' },
                      { value: 'name_desc', label: 'Назвою товару Я-А' },
                    ]}
                  />
                </div>

                <div className={styles['products__drop-down']}>
                  <DropDown
                    label="Товарів на сторінці:"
                    paramKey="perPage"
                    defaultValue="8"
                    options={[
                      { value: '4', label: '4' },
                      { value: '8', label: '8' },
                      { value: '16', label: '16' },
                    ]}
                  />
                </div>
              </div>
            </div>

            {hasSelectedFilters && (
              <div className={styles['products__selected-filters']}>
                {priceMin && priceMax && (
                  <Chip
                    label={`₴ ${priceMin} – ${priceMax}`}
                    onDelete={() => {
                      const nextParams = new URLSearchParams(searchParams);
                      nextParams.delete('priceMin');
                      nextParams.delete('priceMax');
                      setSearchParams(nextParams);
                    }}
                    variant="outlined"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '14px',
                      border: '1px solid #000',
                      mr: 1,
                      mb: 1,
                    }}
                  />
                )}

                {FILTER_KEYS.map((key) =>
                  searchParams.getAll(key).map((value) => (
                    <Chip
                      key={`${key}-${value}`}
                      label={filterLabelMap[key]?.[value] ?? value}
                      onDelete={() => toggleParam(key, value)}
                      variant="outlined"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: '14px',
                        border: '1px solid #000',
                        mr: 1,
                        mb: 1,
                      }}
                    />
                  )),
                )}

                <button className={styles.products__reset} onClick={resetAll}>
                  Скинути
                </button>
              </div>
            )}

            {isEmpty ? (
              <PageState
                type="empty"
                message={
                  hasQuery || hasFilters
                    ? 'За вашим запитом нічого не знайдено 🍷'
                    : 'Наразі товари відсутні'
                }
              />
            ) : (
              <ProductsList products={products} />
            )}

            {!isEmpty && totalPages > 0 && (
              <Stack alignItems="center" sx={{ mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontFamily: '"Playfair Display", serif',
                    },

                    '& .MuiPaginationItem-root.Mui-selected': {
                      backgroundColor: '#7a1e2d',
                      color: '#fff',
                    },

                    '& .MuiPaginationItem-root.Mui-selected:hover': {
                      backgroundColor: '#5c1621',
                    },

                    '& .MuiPaginationItem-root:hover': {
                      backgroundColor: '#f2e6e8',
                    },
                  }}
                />
              </Stack>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
