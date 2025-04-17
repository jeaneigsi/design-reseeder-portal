import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showConfetti, setShowConfetti] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer le paramètre "redirect" s'il existe
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/';

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
        navigate(redirectTo);
      } else {
        // Inscription
        const { error: signUpError } = await signUp(email, password);
        if (signUpError) throw new Error(signUpError.message);
        // Afficher un message de vérification email et les confettis
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
    <div className="min-h-screen flex flex-col">
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-stone-50">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full" onValueChange={(value) => setMode(value as 'login' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscription</TabsTrigger>
            </TabsList>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center text-darkblue">
                  {mode === 'login' ? 'Connectez-vous à votre compte' : 'Créez votre compte'}
                </CardTitle>
                <CardDescription className="text-center">
                  {mode === 'login' 
                    ? 'Accédez à toutes les fonctionnalités de notre plateforme' 
                    : 'Rejoignez notre plateforme pour accéder à tous nos services'}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
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
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemple@email.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
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
              </CardContent>
              
              <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-500">
                  {mode === 'login' 
                    ? "Vous n'avez pas de compte ? " 
                    : "Vous avez déjà un compte ? "}
                  <TabsTrigger value={mode === 'login' ? 'signup' : 'login'} className="p-0 font-medium text-primary underline hover:text-primary/90">
                    {mode === 'login' ? "S'inscrire" : "Se connecter"}
                  </TabsTrigger>
                </p>
              </CardFooter>
            </Card>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login; 