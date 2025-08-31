// DOI normalization and validation utilities

export const normalizeDOI = (raw: string): string => {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, '');
};

export const isValidDOI = (doi: string): boolean => {
  // Basic DOI pattern validation
  const doiPattern = /^10\.\d{4,}\/\S+$/;
  return doiPattern.test(normalizeDOI(doi));
};

export const formatDOIUrl = (doi: string): string => {
  const normalized = normalizeDOI(doi);
  return `https://doi.org/${normalized}`;
};

export const encodeDOIForUrl = (doi: string): string => {
  return encodeURIComponent(normalizeDOI(doi));
};

export const decodeDOIFromUrl = (encoded: string): string => {
  return decodeURIComponent(encoded);
};