import { pipe } from 'src/utils';

export default function PriceNow({ price, deal = 0 }) {
  return (
    <span className={`price ${deal ? 'danger' : ''}`}>
      <sup>{pipe.getSymbol()}</sup>
      {pipe.getNote(price)}
      <sup>{pipe.getCent(price)}</sup>
    </span>
  );
}
