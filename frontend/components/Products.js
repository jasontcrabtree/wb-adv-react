import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';

const ALL_PRODUCTS_QUERY = gql`
  query {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4rem;
`;

function Products() {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_QUERY);

  console.log(data, loading, error);

  if (loading)
    return (
      <div>
        <p>Loading</p>
      </div>
    );

  if (error)
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );

  console.log(data);

  return (
    <div>
      <p>Products</p>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </ProductsListStyles>
    </div>
  );
}

export default Products;
