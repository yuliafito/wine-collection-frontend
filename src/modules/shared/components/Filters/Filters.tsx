import { useSearchParams } from 'react-router-dom';
import { Chip, Slider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from './Filters.module.scss';
import { useFilters } from '../../hooks/useFilters';

type FiltersProps = {
  wineOpen: boolean;
  setWineOpen: (open: boolean) => void;
  countryOpen: boolean;
  setCountryOpen: (open: boolean) => void;
  toggleParam: (key: string, value: string) => void;
};

export const Filters = ({
  wineOpen,
  setWineOpen,
  countryOpen,
  setCountryOpen,
  toggleParam,
}: FiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { moods, purposes, categories, countries, wineTypes } = useFilters();

  const selectedValues = (key: string) => searchParams.getAll(key);

  const price: [number, number] = [
    Number(searchParams.get('priceMin')) || 0,
    Number(searchParams.get('priceMax')) || 5000,
  ];

  const handlePriceChange = (_: Event | React.SyntheticEvent, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) return;

    const [min, max] = newValue;
    const params = new URLSearchParams(searchParams);

    params.set('priceMin', String(min));
    params.set('priceMax', String(max));
    params.delete('page');

    setSearchParams(params);
  };

  return (
    <aside className={styles.filters}>
      <section className={styles.filters__section}>
        <h3 className={styles.filters__title}>🪄 Віртуальний сомельє</h3>

        <p className={styles.filters__subtitle}>Призначення</p>

        <div className={styles.filters__chips}>
          {purposes.map((p) => (
            <Chip
              key={p.id}
              label={p.name}
              clickable
              component="div"
              color={selectedValues('purpose').includes(p.id) ? 'primary' : 'default'}
              onClick={() => toggleParam('purpose', p.id)}
              sx={{
                fontFamily: '"Playfair Display", "Times New Roman", serif',
                fontSize: '14px',
                backgroundColor: selectedValues('purpose').includes(p.id) ? '#7a1e2d' : undefined,
                color: selectedValues('purpose').includes(p.id) ? '#fff' : undefined,
                '&:hover': {
                  backgroundColor: selectedValues('purpose').includes(p.id) ? '#5c1621' : undefined,
                },
              }}
            />
          ))}
        </div>

        <p className={styles.filters__subtitle}>Настрій</p>

        <div className={styles.filters__chips}>
          {moods.map((m) => (
            <Chip
              key={m.id}
              label={m.name}
              clickable
              component="div"
              color={selectedValues('mood').includes(m.id) ? 'primary' : 'default'}
              onClick={() => toggleParam('mood', m.id)}
              sx={{
                fontFamily: '"Playfair Display", "Times New Roman", serif',
                fontSize: '14px',
                backgroundColor: selectedValues('mood').includes(m.id) ? '#7a1e2d' : undefined,
                color: selectedValues('mood').includes(m.id) ? '#fff' : undefined,
                '&:hover': {
                  backgroundColor: selectedValues('mood').includes(m.id) ? '#5c1621' : undefined,
                },
              }}
            />
          ))}
        </div>

        <p className={styles.filters__subtitle}>Категорія</p>

        <div className={styles.filters__chips}>
          {categories.map((c) => (
            <Chip
              key={c.id}
              label={c.name}
              clickable
              component="div"
              color={selectedValues('category').includes(c.id) ? 'primary' : 'default'}
              onClick={() => toggleParam('category', c.id)}
              sx={{
                fontFamily: '"Playfair Display", "Times New Roman", serif',
                fontSize: '14px',
                backgroundColor: selectedValues('category').includes(c.id) ? '#7a1e2d' : undefined,
                color: selectedValues('category').includes(c.id) ? '#fff' : undefined,
                '&:hover': {
                  backgroundColor: selectedValues('category').includes(c.id)
                    ? '#5c1621'
                    : undefined,
                },
              }}
            />
          ))}
        </div>
      </section>

      <section className={styles.filters__section}>
        <p className={styles.filters__subtitle}>Ціна</p>

        <Slider
          value={price}
          onChangeCommitted={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={5000}
          sx={{
            color: '#7a1e2d',
            '& .MuiSlider-thumb': {
              backgroundColor: '#7a1e2d',
            },
            '& .MuiSlider-track': {
              backgroundColor: '#7a1e2d',
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#e0c2c7',
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: '#7a1e2d',
            },
          }}
        />
      </section>

      <section className={styles.filters__section}>
        <Accordion
          disableGutters
          expanded={wineOpen}
          onChange={(_, isExpanded) => setWineOpen(isExpanded)}
        >
          <AccordionSummary
            component="div"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontSize: '14px',
              fontWeight: 500,
              '& .MuiAccordionSummary-content': {
                fontFamily: '"Playfair Display", "Times New Roman", serif',
              },
            }}
          >
            Тип вина
          </AccordionSummary>

          <AccordionDetails>
            <div className={styles.filters__chips}>
              {wineTypes.map((type) => (
                <Chip
                  key={type.id}
                  label={type.name}
                  clickable
                  component="div"
                  color={selectedValues('wine_type').includes(type.id) ? 'primary' : 'default'}
                  onClick={() => toggleParam('wine_type', type.id)}
                  sx={{
                    fontFamily: '"Playfair Display", "Times New Roman", serif',
                    fontSize: '14px',
                    backgroundColor: selectedValues('wine_type').includes(type.id)
                      ? '#7a1e2d'
                      : undefined,
                    color: selectedValues('wine_type').includes(type.id) ? '#fff' : undefined,
                    '&:hover': {
                      backgroundColor: selectedValues('wine_type').includes(type.id)
                        ? '#5c1621'
                        : undefined,
                    },
                  }}
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          disableGutters
          expanded={countryOpen}
          onChange={(_, isExpanded) => setCountryOpen(isExpanded)}
        >
          <AccordionSummary
            component="div"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontSize: '14px',
              fontWeight: 500,
              '& .MuiAccordionSummary-content': {
                fontFamily: '"Playfair Display", "Times New Roman", serif',
              },
            }}
          >
            Країна
          </AccordionSummary>

          <AccordionDetails>
            <div className={styles.filters__chips}>
              {countries.map((country) => (
                <Chip
                  key={country.id}
                  label={country.name}
                  clickable
                  component="div"
                  color={selectedValues('country').includes(country.id) ? 'primary' : 'default'}
                  onClick={() => toggleParam('country', country.id)}
                  sx={{
                    fontFamily: '"Playfair Display", "Times New Roman", serif',
                    fontSize: '14px',
                    backgroundColor: selectedValues('country').includes(country.id)
                      ? '#7a1e2d'
                      : undefined,
                    color: selectedValues('country').includes(country.id) ? '#fff' : undefined,
                    '&:hover': {
                      backgroundColor: selectedValues('country').includes(country.id)
                        ? '#5c1621'
                        : undefined,
                    },
                  }}
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </section>
    </aside>
  );
};
