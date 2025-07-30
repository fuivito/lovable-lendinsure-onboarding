import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { useSearchParams } from "react-router-dom";

const OnboardingFlow = () => {
  const [searchParams] = useSearchParams();
  
  // Extract pre-filled data from URL params
  const prefilledData = {
    customerType: searchParams.get('type') as 'Business' | 'Consumer' | null,
    premiumAmount: searchParams.get('premium') ? parseFloat(searchParams.get('premium')!) : null,
    apr: searchParams.get('apr') ? parseFloat(searchParams.get('apr')!) : null,
    brokerName: searchParams.get('broker') || "Your Insurance Broker"
  };

  return <OnboardingWizard prefilledData={prefilledData} />;
};

export default OnboardingFlow;