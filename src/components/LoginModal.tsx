import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import Confetti from 'react-confetti';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectPath?: string;
}

const LoginModal = ({ isOpen, onClose, redirectPath = '/' }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showConfetti, setShowConfetti] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Réinitialiser les états lors de la fermeture du modal
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setError(null);
      setSuccess(null);
      setLoading(false);
      setShowConfetti(false);
    }
  }, [isOpen]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        // Connexion
        const { error: signInError } = await signIn(email, password);
        if (signInError) throw new Error(signInError.message);
        onClose();
      } else {
        // Inscription
        const { error: signUpError } = await signUp(email, password);
        if (signUpError) throw new Error(signUpError.message);
        setSuccess('Votre compte a été créé avec succès. Veuillez vérifier votre email pour confirmer votre inscription.');
        setShowConfetti(true);
        // Masquer les confettis après 5 secondes
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-darkblue">
              Connexion requise
            </DialogTitle>
            <DialogDescription className="text-center">
              Connectez-vous ou inscrivez-vous pour accéder à cette fonctionnalité
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="login" className="w-full" onValueChange={(value) => setMode(value as 'login' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscription</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleAuth} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="modal-email">Email</Label>
                <Input
                  id="modal-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemple@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="modal-password">Mot de passe</Label>
                <Input
                  id="modal-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary text-white hover:bg-primary/90"
                disabled={loading}
              >
                {loading 
                  ? 'Chargement...' 
                  : mode === 'login' 
                    ? 'Se connecter' 
                    : "S'inscrire"
                }
              </Button>
            </form>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginModal; 