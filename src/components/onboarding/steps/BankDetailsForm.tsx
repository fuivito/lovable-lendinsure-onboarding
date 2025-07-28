import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { OnboardingData } from "../OnboardingWizard";
import { ChevronLeft, Shield, Info } from "lucide-react";

interface BankDetailsFormProps {
  data: Partial<OnboardingData>;
  onNext: () => void;
  onPrev: () => void;
  onUpdateData: (data: Partial<OnboardingData>) => void;
}

export const BankDetailsForm = ({ data, onNext, onPrev, onUpdateData }: BankDetailsFormProps) => {
  const [formData, setFormData] = useState({
    sortCode: data.banking?.sortCode || "",
    accountNumber: data.banking?.accountNumber || "",
    accountHolderName: data.banking?.accountHolderName || "",
    directDebitConsent: data.banking?.directDebitConsent || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.sortCode.trim()) newErrors.sortCode = "Sort code is required";
    else if (!/^\d{2}-\d{2}-\d{2}$/.test(formData.sortCode)) newErrors.sortCode = "Sort code must be in format XX-XX-XX";
    
    if (!formData.accountNumber.trim()) newErrors.accountNumber = "Account number is required";
    else if (!/^\d{8}$/.test(formData.accountNumber)) newErrors.accountNumber = "Account number must be 8 digits";
    
    if (!formData.accountHolderName.trim()) newErrors.accountHolderName = "Account holder name is required";
    if (!formData.directDebitConsent) newErrors.directDebitConsent = "You must authorise Direct Debit to continue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdateData({ banking: formData });
      onNext();
    }
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const formatSortCode = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 4)}-${numbers.slice(4, 6)}`;
  };

  const handleSortCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSortCode(e.target.value);
    updateField("sortCode", formatted);
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbers = e.target.value.replace(/\D/g, '').slice(0, 8);
    updateField("accountNumber", numbers);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onPrev}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Payment Setup</h1>
          <p className="text-muted-foreground">Set up your Direct Debit for monthly payments</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Direct Debit Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900 text-sm">Monthly Payment: £{data.policy?.monthlyAmount?.toFixed(2)}</p>
                  <p className="text-blue-700 text-sm mt-1">
                    Your first payment will be taken in 30 days, then monthly on the same date.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sortCode">Sort Code *</Label>
                <Input
                  id="sortCode"
                  placeholder="XX-XX-XX"
                  value={formData.sortCode}
                  onChange={handleSortCodeChange}
                  maxLength={8}
                  className={errors.sortCode ? "border-destructive" : ""}
                />
                {errors.sortCode && <p className="text-sm text-destructive">{errors.sortCode}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  placeholder="12345678"
                  value={formData.accountNumber}
                  onChange={handleAccountNumberChange}
                  maxLength={8}
                  className={errors.accountNumber ? "border-destructive" : ""}
                />
                {errors.accountNumber && <p className="text-sm text-destructive">{errors.accountNumber}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountHolderName">Account Holder Name *</Label>
              <Input
                id="accountHolderName"
                placeholder="As shown on your bank statement"
                value={formData.accountHolderName}
                onChange={(e) => updateField("accountHolderName", e.target.value)}
                className={errors.accountHolderName ? "border-destructive" : ""}
              />
              {errors.accountHolderName && <p className="text-sm text-destructive">{errors.accountHolderName}</p>}
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-3">
              <h3 className="font-medium">Direct Debit Guarantee</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• This Guarantee is offered by all banks and building societies that accept instructions to pay Direct Debits</p>
                <p>• If there are any changes to the amount, date or frequency of your Direct Debit, Lendinsure will notify you 10 working days in advance</p>
                <p>• If you request Lendinsure to collect a payment, confirmation of the amount will be given to you at the time of the request</p>
                <p>• If an error is made in the payment of your Direct Debit by Lendinsure or your bank, you are entitled to a full and immediate refund</p>
                <p>• You can cancel a Direct Debit at any time by simply contacting your bank or building society</p>
              </div>
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="directDebitConsent"
                  checked={formData.directDebitConsent}
                  onCheckedChange={(checked) => updateField("directDebitConsent", checked as boolean)}
                />
                <div className="space-y-1">
                  <Label htmlFor="directDebitConsent" className="text-sm leading-5">
                    I authorise Lendinsure to take monthly payments of £{data.policy?.monthlyAmount?.toFixed(2)} 
                    from my account via Direct Debit and understand the Direct Debit Guarantee.
                  </Label>
                  {errors.directDebitConsent && <p className="text-sm text-destructive">{errors.directDebitConsent}</p>}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Continue to Sign Agreement
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};