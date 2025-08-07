import { Helmet } from 'react-helmet-async';

interface DynamicMetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  productName?: string;
  productCategory?: string;
  productChemistry?: string;
}

export default function DynamicMetaTags({
  title,
  description,
  image = '/forza-logo-full.png',
  url,
  type = 'website',
  productName,
  productCategory,
  productChemistry
}: DynamicMetaTagsProps) {
  const fullTitle = title ? `${title} - ForzaBuilt` : 'ForzaBuilt - Industrial Adhesives, Sealants, Tapes & Cleaning Solutions';
  const fullDescription = description || 'ForzaBuilt delivers premium industrial solutions across transportation, marine, construction, and manufacturing. Expert adhesives, sealants, tapes, and cleaning products for demanding applications.';
  const fullUrl = url ? `https://forzabuilt.com${url}` : 'https://forzabuilt.com';
  const fullImage = image.startsWith('http') ? image : `https://forzabuilt.com${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="ForzaBuilt" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={fullImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Product-specific structured data */}
      {productName && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": productName,
            "description": fullDescription,
            "image": fullImage,
            "url": fullUrl,
            "brand": {
              "@type": "Brand",
              "name": "ForzaBuilt"
            },
            "category": productCategory,
            "additionalProperty": productChemistry ? [
              {
                "@type": "PropertyValue",
                "name": "Chemistry",
                "value": productChemistry
              }
            ] : undefined
          })}
        </script>
      )}
    </Helmet>
  );
}

