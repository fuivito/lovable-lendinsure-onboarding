import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OnboardingData } from "../OnboardingWizard";
import { ChevronLeft, FileText, PenTool, Shield } from "lucide-react";

interface ESignaturePageProps {
  data: Partial<OnboardingData>;
  onNext: () => void;
  onPrev: () => void;
}

export const ESignaturePage = ({ data, onNext, onPrev }: ESignaturePageProps) => {
  const [isSigning, setIsSigning] = useState(false);

  const handleSign = () => {
    setIsSigning(true);
    // Simulate DocuSign integration delay
    setTimeout(() => {
      setIsSigning(false);
      onNext();
    }, 3000);
  };

  const monthlyAmount = data.policy?.monthlyAmount || 0;
  const totalAmount = monthlyAmount * 10; // 10 monthly payments
  const apr = 9.9;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onPrev}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Sign Your Agreement</h1>
          <p className="text-muted-foreground">Review and sign your payment plan</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Financing Agreement Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer Name</span>
              <span className="font-medium">{data.customer?.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Insurance Provider</span>
              <span className="font-medium">{data.policy?.brokerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Original Premium</span>
              <span className="font-medium">£{data.policy?.premium?.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <h3 className="font-medium">Payment Plan Details</h3>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Monthly Payment</span>
                <span className="font-bold text-primary">£{monthlyAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Number of Payments</span>
                <span>10 monthly payments</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount Payable</span>
                <span className="font-medium">£{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Representative APR</span>
                <span>{apr}%</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>First Payment Date</span>
                <span>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <h3 className="font-medium text-amber-900 mb-2">Important Information</h3>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Your insurance coverage begins immediately upon signing</li>
              <li>• Direct Debit payments will be taken monthly on the same date</li>
              <li>• You can cancel within 14 days for a full refund</li>
              <li>• Missing payments may affect your credit score</li>
            </ul>
          </div>

          <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Secure Digital Signature</span>
            </div>
            <p className="text-sm text-muted-foreground">
              By clicking "Sign & Submit" below, you'll be redirected to our secure DocuSign portal 
              to electronically sign your financing agreement.
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleSign} 
              className="w-full" 
              size="lg"
              disabled={isSigning}
            >
              {isSigning ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing signature...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  Sign & Submit
                </div>
              )}
            </Button>
            <Button variant="outline" onClick={onPrev} className="w-full">
              Review Details
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            By signing, you agree to the terms and conditions of your financing agreement 
            and authorise the collection of monthly payments via Direct Debit.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};