import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-black pt-16 pb-8 shadow-md border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="p-4 rounded-lg hover:shadow-sm transition-shadow duration-300">
            <h3 className="text-lg font-bold mb-4">ENTITÉ</h3>
            <p className="text-gray-600 text-sm mb-4">
              Nous fournissons le meilleur service immobilier avec plus de 25 ans d'expérience.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div className="p-4 rounded-lg hover:shadow-sm transition-shadow duration-300">
            <h3 className="text-lg font-bold mb-4">Liens Populaires</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-primary">À Propos</a></li>
              <li><a href="#" className="hover:text-primary">Services</a></li>
              <li><a href="#" className="hover:text-primary">Propriétés</a></li>
              <li><a href="#" className="hover:text-primary">Agents</a></li>
              <li><a href="#" className="hover:text-primary">Carrières</a></li>
              <li><a href="#" className="hover:text-primary">Nous Contacter</a></li>
            </ul>
          </div>
          
          <div className="p-4 rounded-lg hover:shadow-sm transition-shadow duration-300">
            <h3 className="text-lg font-bold mb-4">Accès Rapide</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-primary">Acheter un Bien</a></li>
              <li><a href="#" className="hover:text-primary">Vendre un Bien</a></li>
              <li><a href="#" className="hover:text-primary">Louer un Bien</a></li>
              <li><a href="#" className="hover:text-primary">Calculer un Prêt</a></li>
              <li><a href="#" className="hover:text-primary">Guide des Quartiers</a></li>
              <li><a href="#" className="hover:text-primary">Tendances du Marché</a></li>
            </ul>
          </div>
          
          <div className="p-4 rounded-lg hover:shadow-sm transition-shadow duration-300">
            <h3 className="text-lg font-bold mb-4">Coordonnées</h3>
            <ul className="space-y-4 text-gray-600 text-sm">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <span>123 Avenue des Affaires, Centre-ville, NY 10001</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span>contact@entite.com</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
            <Button className="mt-4 bg-primary text-white">Obtenir l'Itinéraire</Button>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            &copy; 2023 Entité. Tous droits réservés.
          </p>
          <div className="flex space-x-4 text-gray-600 text-sm">
            <a href="#" className="hover:text-primary">Politique de Confidentialité</a>
            <a href="#" className="hover:text-primary">Conditions d'Utilisation</a>
            <a href="#" className="hover:text-primary">Politique des Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
