import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { LandingPage } from "./steps/LandingPage";
import { CustomerDetailsForm } from "./steps/CustomerDetailsForm";
import { OpenBankingConsent } from "./steps/OpenBankingConsent";
import { BankDetailsForm } from "./steps/BankDetailsForm";
import { ESignaturePage } from "./steps/ESignaturePage";
import { SuccessPage } from "./steps/SuccessPage";
import { DeclinePage } from "./steps/DeclinePage";

export interface OnboardingData {
  policy: {
    premium: number;
    brokerName: string;
    monthlyAmount: number;
  };
  customer: {
    fullName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      postcode: string;
    };
    gdprConsent: boolean;
  };
  banking: {
    sortCode: string;
    accountNumber: string;
    accountHolderName: string;
    directDebitConsent: boolean;
  };
}

const steps = [
  "Policy Summary",
  "Your Details", 
  "Bank Connection",
  "Payment Setup",
  "Sign Agreement",
  "Complete"
];

interface OnboardingWizardProps {
  prefilledData?: {
    customerType: "Business" | "Consumer" | null;
    premiumAmount: number | null;
    apr: number | null;
    brokerName: string;
  };
}

export const OnboardingWizard = ({ prefilledData }: OnboardingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Calculate monthly amount based on prefilled data
  const calculateMonthlyAmount = (premium: number, apr: number) => {
    const monthlyRate = apr / 100 / 12;
    const termMonths = 12;
    
    if (monthlyRate === 0) {
      return premium / termMonths;
    }
    
    return (premium * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
           (Math.pow(1 + monthlyRate, termMonths) - 1);
  };
  
  const [data, setData] = useState<Partial<OnboardingData>>({
    policy: {
      premium: prefilledData?.premiumAmount || 1200,
      brokerName: prefilledData?.brokerName || "SecureShield Insurance",
      monthlyAmount: prefilledData?.premiumAmount && prefilledData?.apr 
        ? calculateMonthlyAmount(prefilledData.premiumAmount, prefilledData.apr)
        : 120
    }
  });
  const [isDeclined, setIsDeclined] = useState(false);

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const simulateDecline = () => {
    setIsDeclined(true);
  };

  if (isDeclined) {
    return <DeclinePage onReturnToBroker={() => window.location.href = "/"} />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <LandingPage data={data} onNext={nextStep} />;
      case 1:
        return <CustomerDetailsForm data={data} onNext={nextStep} onPrev={prevStep} onUpdateData={updateData} />;
      case 2:
        return <OpenBankingConsent onNext={nextStep} onPrev={prevStep} onDecline={simulateDecline} />;
      case 3:
        return <BankDetailsForm data={data} onNext={nextStep} onPrev={prevStep} onUpdateData={updateData} />;
      case 4:
        return <ESignaturePage data={data} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <SuccessPage data={data} onReturnToBroker={() => window.location.href = "/"} />;
      default:
        return <LandingPage data={data} onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <img src="/placeholder.svg" alt="Lendinsure" className="h-8" />
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{steps[currentStep]}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
        
        {renderStep()}
      </div>
    </div>
  );
};