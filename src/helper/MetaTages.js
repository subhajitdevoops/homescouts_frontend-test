import React from "react";
import { Helmet } from "react-helmet";

const MetaTages = ({
  productDescription,
  productName,
  productImageUrl,
}) => {
    console.log('meta productDescription=>',productDescription);
    console.log("meta name",productName);
  return (
    <>
      <Helmet>
        {/* <title>{productName}</title> */}
        <meta name="description" content={productDescription} />
        {/* <meta property="og:title" content={productName} /> */}
        <meta property="og:description" content={productDescription} />
        <meta property="og:image" content={productImageUrl} />
        {/* Add more meta tags as needed */}
      </Helmet>
    </>
  );
};

export default MetaTages;



























