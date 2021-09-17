import { lazy, memo } from 'react';
import { useSelector } from 'react-redux';

import { SuspenseLoad, SusProductCard } from 'src/components/CustomSuspense';
import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';
const ProductCard: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../Product/components/ProductCard')
);

function FeaturedSection() {
  const { products, loading, error }: ProductListType = useSelector((state: AppState) => state.productList);

  return (
    <>
      <h2 className="screen__title">Featured Products</h2>
      <LoadingOrError xl statusOf={{ loading, error }} />
      <MessageBox show={products?.length < 1}>No Product Found</MessageBox>

      <div className="screen__featured">
        <SuspenseLoad>
          {products?.map((product: ProductType) => (
            <SusProductCard key={product._id}>
              <ProductCard product={product} />
            </SusProductCard>
          ))}
        </SuspenseLoad>
      </div>
    </>
  );
}

export default memo(FeaturedSection);
