import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Upload, X, Camera, Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Parcel, parcelsData } from "@/data/parcelsData";

interface AddPropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPropertyForm = ({ isOpen, onClose }: AddPropertyFormProps) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
  
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
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
  
  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    // Convertir les fichiers en URLs de données (base64)
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImages(prev => [...prev, event.target.result as string]);
        }
      };
      
      reader.onerror = () => {
        toast({
          title: "Erreur d'upload",
          description: "Une erreur est survenue lors du chargement de l'image.",
          variant: "destructive"
        });
      };
      
      reader.onloadend = () => {
        setIsUploading(false);
      };
      
      reader.readAsDataURL(file);
    });
    
    // Réinitialiser l'input pour permettre de télécharger à nouveau le même fichier
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
    
    if (images.length === 0) {
      toast({
        title: "Images requises",
        description: "Veuillez ajouter au moins une image de la propriété",
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
    
    // Réinitialiser le formulaire
    setFormData({
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
    setImages([]);
    
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
              <Label>Images *</Label>
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
                
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                
                <button
                  type="button"
                  onClick={handleFileInputClick}
                  disabled={isUploading}
                  className="h-24 w-full border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center hover:border-primary transition-colors gap-2"
                >
                  {isUploading ? (
                    <div className="animate-pulse">Chargement...</div>
                  ) : (
                    <>
                      <Camera className="h-6 w-6 text-gray-400" />
                      <span className="text-xs text-gray-500">Ajouter des photos</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500">Formats supportés: JPG, PNG, WEBP. Max 5MB par image.</p>
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
