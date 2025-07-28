import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OnboardingData } from "../OnboardingWizard";

interface LandingPageProps {
  data: Partial<OnboardingData>;
  onNext: () => void;
}

export const LandingPage = ({ data, onNext }: LandingPageProps) => {
  const policy = data.policy;
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Pay Monthly with Lendinsure</h1>
        <p className="text-muted-foreground">
          Split your insurance premium into affordable monthly payments
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Policy Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Insurance Provider</span>
            <span className="font-medium">{policy?.brokerName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Premium</span>
            <span className="font-medium">£{policy?.premium?.toFixed(2)}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Monthly Payment</span>
              <span className="text-2xl font-bold text-primary">
                £{policy?.monthlyAmount?.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Spread over 10 monthly payments
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-2">What happens next?</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Complete a quick affordability check</li>
          <li>• Set up your Direct Debit</li>
          <li>• Sign your payment agreement</li>
          <li>• Start your coverage immediately</li>
        </ul>
      </div>

      <Button onClick={onNext} className="w-full" size="lg">
        Continue with Monthly Instalments
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Representative APR 9.9%. Credit subject to status.
      </p>
    </div>
  );
};