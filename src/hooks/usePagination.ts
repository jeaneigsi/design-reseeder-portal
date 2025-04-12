import { useState, useMemo } from 'react';

interface UsePaginationOptions {
  totalItems: number;
  initialPage?: number;
  itemsPerPage?: number;
  siblingCount?: number;
}

interface UsePaginationResult {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  itemsPerPage: number;
  firstItemIndex: number;
  lastItemIndex: number;
  handlePageChange: (page: number) => void;
  paginationItems: (number | string)[];
}

export const usePagination = ({
  totalItems,
  initialPage = 1,
  itemsPerPage = 9,
  siblingCount = 1
}: UsePaginationOptions): UsePaginationResult => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  // Calcul du nombre total de pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Indices des éléments sur la page actuelle
  const firstItemIndex = (currentPage - 1) * itemsPerPage;
  const lastItemIndex = Math.min(firstItemIndex + itemsPerPage, totalItems);

  // Gestion du changement de page
  const handlePageChange = (page: number) => {
    // S'assurer que la page est dans les limites valides
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
    
    // Défiler vers le haut de la page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Génération des éléments de pagination (numéros de page, points de suspension, etc.)
  const paginationItems = useMemo(() => {
    const range = (start: number, end: number) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, idx) => start + idx);
    };

    // Cas où il y a peu de pages
    if (totalPages <= 5 + siblingCount * 2) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    // Toujours montrer la première et la dernière page
    if (shouldShowLeftDots && shouldShowRightDots) {
      // Cas où on montre les points de suspension à gauche et à droite
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, '...', ...middleRange, '...', totalPages];
    } else if (!shouldShowLeftDots && shouldShowRightDots) {
      // Cas où on ne montre que les points de suspension à droite
      const leftRange = range(1, rightSiblingIndex);
      return [...leftRange, '...', totalPages];
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      // Cas où on ne montre que les points de suspension à gauche
      const rightRange = range(leftSiblingIndex, totalPages);
      return [1, '...', ...rightRange];
    }

    // Par défaut, afficher toutes les pages
    return range(1, totalPages);
  }, [currentPage, totalPages, siblingCount]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    firstItemIndex,
    lastItemIndex,
    handlePageChange,
    paginationItems
  };
}; 