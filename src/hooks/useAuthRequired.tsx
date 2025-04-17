import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';

/**
 * Hook pour gérer l'accès aux fonctionnalités nécessitant une authentification
 * 
 * @returns Un objet avec:
 * - isLoginModalOpen: état d'ouverture du modal de connexion
 * - setLoginModalOpen: fonction pour ouvrir/fermer le modal
 * - checkAuthAndProceed: fonction pour vérifier l'authentification et procéder si l'utilisateur est connecté
 */
export const useAuthRequired = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { user } = useAuth();

  /**
   * Vérifie si l'utilisateur est authentifié et procède à l'action si c'est le cas
   * Sinon, ouvre le modal de connexion
   * 
   * @param callback Fonction à exécuter si l'utilisateur est authentifié
   * @returns true si l'utilisateur est authentifié, false sinon
   */
  const checkAuthAndProceed = (callback: () => void): boolean => {
    if (user) {
      callback();
      return true;
    } else {
      setLoginModalOpen(true);
      return false;
    }
  };

  return {
    isLoginModalOpen,
    setLoginModalOpen,
    checkAuthAndProceed,
    isAuthenticated: !!user,
  };
};

export default useAuthRequired; 