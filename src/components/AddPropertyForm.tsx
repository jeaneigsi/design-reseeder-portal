
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Upload, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Parcel, parcelsData } from "@/data/parcelsData";

interface AddPropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPropertyForm = ({ isOpen, onClose }: AddPropertyFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    location: "",
    price: "",
    area: "",
    areaUnit: "m²",
    description: "",
    sellerType: "STORE",
    sellerName: "",
    forSale: true,
    featured: false
  });
  
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"
  ]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  
  const handleAddImage = () => {
    // Ajouter des images aléatoires d'Unsplash
    const unsplashImages = [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff"
    ];
    
    const randomImage = unsplashImages[Math.floor(Math.random() * unsplashImages.length)];
    setImages((prev) => [...prev, randomImage]);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.location || !formData.price) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }
    
    const newProperty: Parcel = {
      id: parcelsData.length + 1,
      subject: formData.subject,
      location: formData.location,
      price: {
        value: parseFloat(formData.price),
        currency: "DH"
      },
      images: images,
      seller: {
        type: formData.sellerType as "STORE" | "INDIVIDUAL",
        name: formData.sellerName || "Utilisateur",
        isVerifiedSeller: false,
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
        rating: 4.5,
        reviews: 10,
      },
      description: formData.description,
      area: formData.area ? parseFloat(formData.area) : undefined,
      areaUnit: formData.areaUnit,
      featured: formData.featured,
      forSale: formData.forSale,
      createdAt: new Date().toISOString().split('T')[0],
      features: ["Titre foncier", "Accès facile"]
    };
    
    // Ajouter la nouvelle propriété aux données
    parcelsData.unshift(newProperty);
    
    toast({
      title: "Propriété ajoutée",
      description: "Votre propriété a été ajoutée avec succès!",
      variant: "default"
    });
    
    onClose();
    // Rediriger vers la page de la nouvelle propriété
    navigate(`/property/${newProperty.id}`);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Ajouter une propriété</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Titre de la propriété *</Label>
              <Input 
                id="subject" 
                name="subject" 
                placeholder="ex: VENTE LOT DE TERRAIN - 113M²" 
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="location">Emplacement *</Label>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <Input 
                  id="location" 
                  name="location" 
                  placeholder="ex: Casablanca, Lissasfa" 
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Prix (DH) *</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  placeholder="ex: 898350" 
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="area">Surface</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="area" 
                    name="area" 
                    type="number" 
                    placeholder="ex: 113" 
                    value={formData.area}
                    onChange={handleInputChange}
                  />
                  <Select
                    value={formData.areaUnit}
                    onValueChange={(value) => handleSelectChange("areaUnit", value)}
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="Unité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m²">m²</SelectItem>
                      <SelectItem value="ha">ha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description"
                placeholder="Description détaillée de la propriété..." 
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sellerType">Type de vendeur</Label>
                <Select
                  value={formData.sellerType}
                  onValueChange={(value) => handleSelectChange("sellerType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type de vendeur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STORE">Professionnel</SelectItem>
                    <SelectItem value="INDIVIDUAL">Particulier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="sellerName">Nom du vendeur</Label>
                <Input 
                  id="sellerName" 
                  name="sellerName" 
                  placeholder="Votre nom ou société" 
                  value={formData.sellerName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Images</Label>
              <div className="grid grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`Image ${index + 1}`} 
                      className="h-24 w-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-1 right-1 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="h-24 w-full border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-primary transition-colors"
                >
                  <Upload className="h-6 w-6 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="forSale"
                  checked={formData.forSale}
                  onChange={(e) => setFormData((prev) => ({ ...prev, forSale: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="forSale" className="cursor-pointer">À vendre</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="featured" className="cursor-pointer">En vedette</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
            <Button type="submit">Ajouter la propriété</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyForm;
