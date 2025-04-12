import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Upload, X, Camera, Image as ImageIcon, Check, Info, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Parcel, parcelsData } from "@/data/parcelsData";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AddPropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPropertyForm = ({ isOpen, onClose }: AddPropertyFormProps) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [previewImage, setPreviewImage] = useState<number | null>(null);
  
  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setImages([]);
      setFormErrors({});
    }
  }, [isOpen]);
  
  const validateStep = () => {
    const errors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.subject.trim()) errors.subject = "Le titre est requis";
      if (!formData.location.trim()) errors.location = "L'emplacement est requis";
      if (!formData.price.trim()) errors.price = "Le prix est requis";
      else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
        errors.price = "Veuillez entrer un prix valide";
      }
      if (formData.area && (isNaN(parseFloat(formData.area)) || parseFloat(formData.area) <= 0)) {
        errors.area = "Veuillez entrer une surface valide";
      }
    } else if (currentStep === 2) {
      if (images.length === 0) errors.images = "Au moins une image est requise";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImage(null);
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
    
    if (!validateStep()) {
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
  
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-6">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                currentStep > index + 1 
                  ? "bg-green-100 text-green-600 border border-green-400" 
                  : currentStep === index + 1 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-100 text-gray-400 border border-gray-300"
              )}
            >
              {currentStep > index + 1 ? <Check size={16} /> : index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div 
                className={cn(
                  "h-1 w-12", 
                  currentStep > index + 1 ? "bg-green-400" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Informations de base</h3>
            
            <div>
              <Label htmlFor="subject" className="flex items-center">
                Titre de la propriété <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input 
                id="subject" 
                name="subject" 
                placeholder="ex: VENTE LOT DE TERRAIN - 113M²" 
                value={formData.subject}
                onChange={handleInputChange}
                className={cn(formErrors.subject && "border-red-500")}
              />
              {formErrors.subject && (
                <p className="text-sm text-red-500 mt-1">{formErrors.subject}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="location" className="flex items-center">
                Emplacement <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input 
                  id="location" 
                  name="location" 
                  placeholder="ex: Casablanca, Lissasfa" 
                  value={formData.location}
                  onChange={handleInputChange}
                  className={cn("pl-9", formErrors.location && "border-red-500")}
                />
                <MapPin className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {formErrors.location && (
                <p className="text-sm text-red-500 mt-1">{formErrors.location}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price" className="flex items-center">
                  Prix (DH) <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  placeholder="ex: 898350" 
                  value={formData.price}
                  onChange={handleInputChange}
                  className={cn(formErrors.price && "border-red-500")}
                />
                {formErrors.price && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.price}</p>
                )}
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
                    className={cn(formErrors.area && "border-red-500")}
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
                {formErrors.area && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.area}</p>
                )}
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
                <Label htmlFor="forSale">Type d'annonce</Label>
                <div className="flex mt-2 border rounded-md overflow-hidden">
                  <button
                    type="button"
                    className={cn(
                      "flex-1 py-2 text-center text-sm",
                      formData.forSale 
                        ? "bg-primary text-white" 
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={() => setFormData(prev => ({ ...prev, forSale: true }))}
                  >
                    À vendre
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "flex-1 py-2 text-center text-sm",
                      !formData.forSale 
                        ? "bg-primary text-white" 
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={() => setFormData(prev => ({ ...prev, forSale: false }))}
                  >
                    À louer
                  </button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="featured">Option</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                    className="rounded text-primary"
                  />
                  <Label htmlFor="featured" className="cursor-pointer text-sm">Mettre en vedette</Label>
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Images & Photos</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="flex items-center">
                  Images <span className="text-red-500 ml-1">*</span>
                </Label>
                <span className="text-xs text-gray-500">
                  {images.length} image{images.length !== 1 ? 's' : ''} ajoutée{images.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {formErrors.images && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm flex items-start">
                  <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <p>{formErrors.images}</p>
                </div>
              )}
              
              <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
                {previewImage !== null ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-md mx-auto">
                      <img 
                        src={images[previewImage]} 
                        alt={`Preview ${previewImage + 1}`} 
                        className="max-h-[300px] object-contain mx-auto rounded-md"
                      />
                      <div className="absolute top-0 right-0 flex space-x-2 m-2">
                        <button
                          type="button"
                          onClick={() => setPreviewImage(null)}
                          className="bg-white rounded-full p-1.5 shadow hover:bg-gray-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2">
                        <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                          {previewImage + 1} / {images.length}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <button
                        type="button"
                        onClick={() => setPreviewImage(prev => (prev === 0 ? images.length - 1 : (prev as number) - 1))}
                        className="bg-white rounded-full p-2 shadow hover:bg-gray-100 mr-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewImage(prev => (prev === images.length - 1 ? 0 : (prev as number) + 1))}
                        className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {images.map((image, index) => (
                        <div 
                          key={index} 
                          className="relative group cursor-pointer rounded-md overflow-hidden"
                          onClick={() => setPreviewImage(index)}
                        >
                          <img 
                            src={image} 
                            alt={`Image ${index + 1}`} 
                            className="h-20 w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleImageRemove(index);
                              }}
                              className="bg-white/80 rounded-full p-1"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
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
                      className="w-full py-8 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center hover:border-primary transition-colors gap-2 bg-white"
                    >
                      {isUploading ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2">
                            <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                          <span>Chargement des images...</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-gray-400" />
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-600">Glissez-déposez des images ou cliquez pour parcourir</p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP jusqu'à 5MB</p>
                          </div>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Informations du vendeur</h3>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Vos informations de contact sont importantes</p>
                  <p>Ces informations seront affichées publiquement pour permettre aux acheteurs potentiels de vous contacter.</p>
                </div>
              </div>
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
            
            <div className="border-t border-gray-200 pt-4 mt-6">
              <h4 className="text-sm font-medium mb-2">Récapitulatif</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="text-gray-500">Titre:</div>
                  <div className="font-medium">{formData.subject}</div>
                  
                  <div className="text-gray-500">Emplacement:</div>
                  <div className="font-medium">{formData.location}</div>
                  
                  <div className="text-gray-500">Prix:</div>
                  <div className="font-medium">{formData.price} DH</div>
                  
                  <div className="text-gray-500">Surface:</div>
                  <div className="font-medium">{formData.area} {formData.areaUnit}</div>
                  
                  <div className="text-gray-500">Type d'annonce:</div>
                  <div className="font-medium">{formData.forSale ? "À vendre" : "À louer"}</div>
                  
                  <div className="text-gray-500">Images:</div>
                  <div className="font-medium">{images.length} image(s)</div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Ajouter une propriété
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="py-4">
          {renderStepIndicator()}
          
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
          
          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>
            ) : (
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
            )}
            
            {currentStep < totalSteps ? (
              <Button 
                type="button" 
                onClick={nextStep}
                className="flex items-center"
              >
                Suivant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary/90"
              >
                Publier l'annonce
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyForm;
