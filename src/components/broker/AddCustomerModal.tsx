import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CustomerType } from "@/pages/BrokerPortal";

interface AddCustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    type: CustomerType;
    premiumAmount: number;
    apr: number;
  }) => void;
}

export const AddCustomerModal = ({ open, onOpenChange, onSubmit }: AddCustomerModalProps) => {
  const [customerType, setCustomerType] = useState<CustomerType>("Consumer");
  const [premiumAmount, setPremiumAmount] = useState<string>("");
  const [apr, setApr] = useState<string>("4.5");

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setCustomerType("Consumer");
      setPremiumAmount("");
      setApr("4.5");
    }
  }, [open]);

  const calculateRepaymentDetails = () => {
    const premium = parseFloat(premiumAmount) || 0;
    const annualRate = parseFloat(apr) || 0;
    const monthlyRate = annualRate / 100 / 12;
    const termMonths = 12; // Default to 12 months

    if (premium === 0) return null;

    // Calculate monthly payment using loan formula
    const monthlyPayment = monthlyRate === 0 
      ? premium / termMonths
      : (premium * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
        (Math.pow(1 + monthlyRate, termMonths) - 1);

    const totalRepayable = monthlyPayment * termMonths;
    const totalInterest = totalRepayable - premium;
    const brokerProfit = totalInterest * 0.3; // Assume broker gets 30% of interest

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalRepayable: totalRepayable.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      brokerProfit: brokerProfit.toFixed(2)
    };
  };

  const repaymentDetails = calculateRepaymentDetails();

  const handleSubmit = () => {
    if (!premiumAmount || parseFloat(premiumAmount) <= 0) return;

    onSubmit({
      type: customerType,
      premiumAmount: parseFloat(premiumAmount),
      apr: parseFloat(apr)
    });
  };

  const isValid = premiumAmount && parseFloat(premiumAmount) > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerType">Customer Type</Label>
              <Select value={customerType} onValueChange={(value) => setCustomerType(value as CustomerType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consumer">Consumer</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="premiumAmount">Insurance Premium (£)</Label>
              <Input
                id="premiumAmount"
                type="number"
                placeholder="1,200"
                value={premiumAmount}
                onChange={(e) => setPremiumAmount(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apr">Annual Percentage Rate (APR)</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="apr"
                type="number"
                value={apr}
                onChange={(e) => setApr(e.target.value)}
                min="0"
                max="10"
                step="0.1"
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">% (0% - 10%)</span>
            </div>
          </div>

          <Separator />

          {/* Repayment Preview */}
          {repaymentDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Repayment Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Premium Amount:</span>
                      <span className="font-medium">£{parseFloat(premiumAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Monthly Payment:</span>
                      <span className="font-medium">£{repaymentDetails.monthlyPayment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Repayable:</span>
                      <span className="font-medium">£{repaymentDetails.totalRepayable}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Term:</span>
                      <span className="font-medium">12 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Interest:</span>
                      <span className="font-medium">£{repaymentDetails.totalInterest}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Broker Profit:</span>
                      <span className="font-medium text-primary">£{repaymentDetails.brokerProfit}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!isValid}>
              Start Financing Flow
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};