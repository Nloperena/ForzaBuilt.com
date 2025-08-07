// Image mapping service to map product IDs to available images

export class ImageMappingService {
  /**
   * Maps product IDs to available images
   * This is a fallback when the original imageUrl doesn't exist
   */
  static getImageForProduct(productId: string): string {
    const mapping: Record<string, string> = {
      // OA (Adhesive) products
      'oa75': '/product-images/oa23.png', // Using oa23.png as fallback for OA75
      'm-oa755': '/product-images/oa13.png', // Using oa13.png as fallback for M-OA755
      
      // OS (Sealant) products
      'os55': '/product-images/os55.png',
      'os45': '/product-images/os45.png',
      'os61': '/product-images/os61.png',
      'os37': '/product-images/os37.png',
      'os35': '/product-images/os35.png',
      'os31': '/product-images/os31.png',
      'os25': '/product-images/os25.png',
      'os20': '/product-images/os20.png',
      'os10': '/product-images/os10.png',
      'os2': '/product-images/os2.png',
      
      // T (Tape) products
      't500': '/product-images/t500.png',
      't461': '/product-images/t461.png',
      't970': '/product-images/t970.png',
      't950': '/product-images/t950.png',
      't900': '/product-images/t900.png',
      't715': '/product-images/t715.png',
      't600': '/product-images/t600.png',
      't464': '/product-images/t464.png',
      't350': '/product-images/t350.png',
      't305': '/product-images/t305.png',
      't220': '/product-images/t220.png',
      't215': '/product-images/t215.png',
      't-t430': '/product-images/t-t430.png',
      't-t1420': '/product-images/t-t1420.png',
      't-t1200': '/product-images/t-t1200.png',
      't-t420': '/product-images/t-t420.png',
      't-t415': '/product-images/t-t415.png',
      
      // C (Cleaner) products
      'c-t5100': '/product-images/c-t5100.png',
      'c-t731': '/product-images/c-t731.png',
      'c-t564': '/product-images/c-t564.png',
      'c-t557': '/product-images/c-t557.png',
      'c-t553': '/product-images/c-t553.png',
      'c-t550': '/product-images/c-t550.png',
      'c-t500': '/product-images/c-t500.png',
      'c-os9': '/product-images/c-os9.png',
      'c-oa77': '/product-images/c-oa77.png',
      'c-oa52': '/product-images/c-oa52.png',
      'c-oa5': '/product-images/c-oa5.png',
      'c-oa98': '/product-images/c-oa98.png',
      'c-r560': '/product-images/c-r560.png',
      'c-r552': '/product-images/c-r552.png',
      'c-r329': '/product-images/c-r329.png',
      'c-os55': '/product-images/c-os55.png',
      'c-c551': '/product-images/c-c551.png',
      'c-c360': '/product-images/c-c360.png',
      'c-w6106': '/product-images/c-w6106.png',
      'c-s538': '/product-images/c-s538.png',
      
      // R (RuggedRed) products
      'r-t860': '/product-images/r-t860.png',
      'r-t620': '/product-images/r-t620.png',
      'r-t600': '/product-images/r-t600.png',
      'r-os84': '/product-images/r-os84.png',
      'r-os8': '/product-images/r-os8.png',
      'r-osa': '/product-images/r-osa.png',
      'r-a2000': '/product-images/r-a2000.png',
      'r-r820': '/product-images/r-r820.png',
      'r-c661': '/product-images/r-c661.png',
      
      // RC (RuggedRed Cleaner) products
      'rc887': '/product-images/rc887.png',
      'rc886': '/product-images/rc886.png',
      'rc864': '/product-images/rc864.png',
      'rc863': '/product-images/rc863.png',
      'rc862': '/product-images/rc862.png',
      'rc826': '/product-images/rc826.png',
      
      // TAC (Tape Adhesive) products
      'tac-os75': '/product-images/tac-os75.png',
      'tac-os74': '/product-images/tac-os74.png',
      'tac-r777': '/product-images/tac-r777.png',
      'tac-r750': '/product-images/tac-r750.png',
      'tac850': '/product-images/tac850.png',
      
      // T-OS (Tape Sealant) products
      't-os164': '/product-images/t-os164.png',
      't-os151': '/product-images/t-os151.png',
      't-os150': '/product-images/t-os150.png',
      't-oa177': '/product-images/t-oa177.png',
      't-oa156': '/product-images/t-oa156.png',
      't-oa152': '/product-images/t-oa152.png',
      't-osa155': '/product-images/t-osa155.png',
      
      // T-C (Tape Cleaner) products
      't-c485': '/product-images/t-c485.png',
      't-c225': '/product-images/t-c225.png',
      't-c222': '/product-images/t-c222.png',
      
      // T-R (Tape RuggedRed) products
      't-r785': '/product-images/t-r785.png',
      't-r679': '/product-images/t-r679.png',
      't-s596': '/product-images/t-s596.png',
      
      // TC (Tape Cleaner) products
      'tc467': '/product-images/tc467.png',
      'tc466': '/product-images/tc466.png',
      'tc456': '/product-images/tc456.png',
      'tc454': '/product-images/tc454.png',
      'tc453': '/product-images/tc453.png',
      'tc452': '/product-images/tc452.png',
      
      // CC (Cleaner Cleaner) products
      'cc503-aa': '/product-images/cc503-aa.png',
      'cc519': '/product-images/cc519.png',
      
      // Other products
      'ca2400': '/product-images/ca2400.png',
      'ca1500': '/product-images/ca1500.png',
      'ca1000': '/product-images/ca1000.png',
      'oa23': '/product-images/oa23.png',
      'oa13': '/product-images/oa13.png',
      'oa12': '/product-images/oa12.png',
      '81-0389': '/product-images/81-0389.png',
      'ic947': '/product-images/ic947.png',
      'ic932': '/product-images/ic932.png',
      'ic946--ca-compliant-pressure-sensitive-contact-adhesive': '/product-images/ic946--ca-compliant-pressure-sensitive-contact-adhesive.png',
    };
    
    return mapping[productId.toLowerCase()] || '/product-images/placeholder.png';
  }

  /**
   * Validates if an image URL exists and returns a fallback if not
   */
  static async validateAndGetImage(imageUrl: string, productId: string): Promise<string> {
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      if (response.ok) {
        return imageUrl;
      }
    } catch {
      // Image doesn't exist, use fallback
    }
    
    return this.getImageForProduct(productId);
  }

  /**
   * Gets all available product images
   */
  static getAvailableImages(): string[] {
    return [
      '/product-images/t500.png',
      '/product-images/t461.png',
      '/product-images/os55.png',
      '/product-images/os45.png',
      '/product-images/ic946--ca-compliant-pressure-sensitive-contact-adhesive.png',
      '/product-images/t970.png',
      '/product-images/t950.png',
      '/product-images/t900.png',
      '/product-images/t715.png',
      '/product-images/t600.png',
      '/product-images/t464.png',
      '/product-images/t350.png',
      '/product-images/t305.png',
      '/product-images/t220.png',
      '/product-images/t215.png',
      '/product-images/t-t430.png',
      '/product-images/t-t1420.png',
      '/product-images/t-t1200.png',
      '/product-images/t-t420.png',
      '/product-images/t-t415.png',
      '/product-images/c-t5100.png',
      '/product-images/c-t731.png',
      '/product-images/c-t564.png',
      '/product-images/c-t557.png',
      '/product-images/c-t553.png',
      '/product-images/c-t550.png',
      '/product-images/c-t500.png',
      '/product-images/os61-adhesive.png',
      '/product-images/os61.png',
      '/product-images/os37.png',
      '/product-images/os35.png',
      '/product-images/os31.png',
      '/product-images/os25.png',
      '/product-images/os20.png',
      '/product-images/os10.png',
      '/product-images/os2.png',
      '/product-images/ca2400.png',
      '/product-images/ca1500.png',
      '/product-images/ca1000.png',
      '/product-images/oa23.png',
      '/product-images/oa13.png',
      '/product-images/oa12.png',
      '/product-images/81-0389.png',
      '/product-images/ic947.png',
      '/product-images/ic932.png',
      '/product-images/r-t860.png',
      '/product-images/r-t620.png',
      '/product-images/r-t600.png',
      '/product-images/r-os84.png',
      '/product-images/r-os8.png',
      '/product-images/r-osa.png',
      '/product-images/r-a2000.png',
      '/product-images/r-r820.png',
      '/product-images/r-c661.png',
      '/product-images/rc887.png',
      '/product-images/rc886.png',
      '/product-images/rc864.png',
      '/product-images/rc863.png',
      '/product-images/rc862.png',
      '/product-images/rc826.png',
      '/product-images/tac-os75.png',
      '/product-images/tac-os74.png',
      '/product-images/tac-r777.png',
      '/product-images/tac-r750.png',
      '/product-images/tac850.png',
      '/product-images/t-os164.png',
      '/product-images/t-os151.png',
      '/product-images/t-os150.png',
      '/product-images/c-os9.png',
      '/product-images/t-c485.png',
      '/product-images/t-c225.png',
      '/product-images/t-c222.png',
      '/product-images/t-oa177.png',
      '/product-images/t-oa156.png',
      '/product-images/t-r785.png',
      '/product-images/t-r679.png',
      '/product-images/t-s596.png',
      '/product-images/t-oa152.png',
      '/product-images/t-osa155.png',
      '/product-images/tc467.png',
      '/product-images/tc466.png',
      '/product-images/tc456.png',
      '/product-images/tc454.png',
      '/product-images/tc453.png',
      '/product-images/tc452.png',
      '/product-images/c-w6106.png',
      '/product-images/c-s538.png',
      '/product-images/c-oa77.png',
      '/product-images/c-osa.png',
      '/product-images/c-oa52.png',
      '/product-images/c-oa5.png',
      '/product-images/c-r560.png',
      '/product-images/c-r552.png',
      '/product-images/c-r329.png',
      '/product-images/c-os55.png',
      '/product-images/c-oa98.png',
      '/product-images/c-c551.png',
      '/product-images/c-c360.png',
      '/product-images/cc503-aa.png',
      '/product-images/cc519.png'
    ];
  }
}
