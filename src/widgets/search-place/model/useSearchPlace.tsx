import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { debounce } from 'lodash';
import { GetPlacesByKeywordResponseT } from '../types/keyword';
import getPlacesByKeyword from '../api/getPlacesByKeyword';
import { GetPlacesByAddressResponseT } from '../types/address';
import getPlacesByAddress from '../api/getPlacesByAddress';

export const useSearchPlace = () => {
  const queryClient = useQueryClient();

  const keywordQMutate = useMutation<
    GetPlacesByKeywordResponseT,
    unknown,
    string
  >({
    mutationFn: getPlacesByKeyword,
    onMutate: async (value: string) => {
      await queryClient.cancelQueries({
        queryKey: ['keywordQuery', value],
      });
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['keywordQuery', variables], data);
    },
  });

  const addressQMutate = useMutation<
    GetPlacesByAddressResponseT,
    unknown,
    string
  >({
    mutationFn: getPlacesByAddress,
    onMutate: async (value: string) => {
      await queryClient.cancelQueries({
        queryKey: ['addressQuery', value],
      });
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['addressQuery', variables], data);
    },
  });

  const debouncedMutate = useMemo(
    () =>
      debounce((value: string) => {
        if (value === '') return;
        keywordQMutate.mutate(value);
        addressQMutate.mutate(value);
      }, 300),
    [keywordQMutate.mutate, addressQMutate.mutate]
  );

  return {
    keywordQMutate,
    addressQMutate,
    debouncedMutate,
  };
};
