import type { SxProps } from "@mui/material";
import React, { ComponentType } from "react";

import "./product-card.css";

interface ProductCardProps {
  productTitle: string;
  productUrl: string;
  Logo: ComponentType<{ sx?: SxProps }>;
}

const ProductCard = ({ productUrl, productTitle, Logo }: ProductCardProps) => {
  return (
    <div className="product-card">
      <Logo />
      <div className="product-card-title">
        <a href={productUrl} target="_blank" rel="noreferrer">
          {productTitle}
        </a>
      </div>
    </div>
  );
};

export { ProductCard };
