import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Shield, Eye, Clock, CheckCircle } from "lucide-react";

interface OpenBankingConsentProps {
  onNext: () => void;
  onPrev: () => void;
  onDecline: () => void;
}

export const OpenBankingConsent = ({ onNext, onPrev, onDecline }: OpenBankingConsentProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate bank connection delay
    setTimeout(() => {
      setIsConnecting(false);
      // Simulate random decline for demo (10% chance)
      if (Math.random() < 0.1) {
        onDecline();
      } else {
        onNext();
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onPrev}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Connect Your Bank</h1>
          <p className="text-muted-foreground">Secure affordability check via Open Banking</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Secure Bank Connection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm">
              We'll connect to your bank account to check your affordability for monthly payments. 
              This is a secure, read-only connection that allows us to verify your income and spending patterns.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">What we'll check:</h3>
            <div className="grid gap-3">
              <div className="flex items-start gap-3">
                <Eye className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Income verification</p>
                  <p className="text-sm text-muted-foreground">Recent salary payments and regular income</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Spending patterns</p>
                  <p className="text-sm text-muted-foreground">Regular outgoings and available disposable income</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Account status</p>
                  <p className="text-sm text-muted-foreground">Account health and payment history</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Your data is secure</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• FCA regulated and Open Banking compliant</li>
              <li>• Read-only access - we cannot move money</li>
              <li>• Data encrypted and never stored permanently</li>
              <li>• Connection expires after 90 days</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleConnect} 
              className="w-full" 
              size="lg"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connecting to your bank...
                </div>
              ) : (
                "Connect Your Bank Securely"
              )}
            </Button>
            <Button variant="outline" onClick={onPrev} className="w-full">
              Go Back
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you consent to Lendinsure accessing your account information via our secure Open Banking connection.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};