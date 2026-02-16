import { useEffect, useState } from 'react';
import { getPurposes } from '../api/filters';

export const usePurposeByName = (name: string) => {
  const [purposeId, setPurposeId] = useState<string>();

  useEffect(() => {
    getPurposes().then((purposes) => {
      const found = purposes.find((p) => p.name === name);
      setPurposeId(found?.id);
    });
  }, [name]);

  return purposeId;
};
