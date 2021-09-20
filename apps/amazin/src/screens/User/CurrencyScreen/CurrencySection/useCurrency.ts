import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';

import { updateCurrencyRates } from 'src/apis/productAPI';
import { updateUserProfile } from 'src/apis/userAPI';
import { currencyTypeActions } from 'src/slice/ProductSlice';
import { userUpdateProfileActions } from 'src/slice/UserSlice';
import { useShadow } from 'src/hooks/useShadow';
import { Storage, pipe } from 'src/utils';
import { KEY } from 'src/constants';

export function useCurrency() {
  const dispatch = useDispatch();
  const { cType: paramCurrency }: { cType: CurrType } = useParams();
  const { userInfo } = useShadow();
  const [currency, setCurrency] = useState<CurrType>('EUR');
  const [isChanged, setIsChanged] = useState(false);

  const SHOW_CURR = `${pipe.symbol[currency]} - ${currency} - ${pipe.longName[currency]}`;
  const hist: string = Storage[KEY.HISTORY];
  const back = !hist || hist.startsWith('/currency') ? '/' : hist;

  useEffect(() => {
    setIsChanged(false);
    setCurrency(paramCurrency || pipe.currency);
    if (!userInfo?._id) dispatch(userUpdateProfileActions._RESET(''));
    return () => {
      dispatch(userUpdateProfileActions._RESET(''));
    };
  }, [userInfo?._id, paramCurrency, dispatch]);

  const submitChange = () => {
    Storage[KEY.CURRENCY] = currency;
    pipe.setCurrency(currency);
    dispatch(updateCurrencyRates());
    dispatch(currencyTypeActions._CHANGE(currency));
    setIsChanged(true);
    if (!userInfo) return;
    const { _id, name, email } = userInfo;
    dispatch(updateUserProfile({ _id, name, email, currency }));
  };

  return { SHOW_CURR, back, currency, setCurrency, isChanged, submitChange };
}
