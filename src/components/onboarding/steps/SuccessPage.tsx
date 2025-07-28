import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OnboardingData } from "../OnboardingWizard";
import { CheckCircle, Calendar, CreditCard, Mail, Download } from "lucide-react";

interface SuccessPageProps {
  data: Partial<OnboardingData>;
  onReturnToBroker: () => void;
}

export const SuccessPage = ({ data, onReturnToBroker }: SuccessPageProps) => {
  const monthlyAmount = data.policy?.monthlyAmount || 0;
  const startDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  
  // Generate payment schedule
  const paymentSchedule = Array.from({ length: 10 }, (_, i) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    return {
      payment: i + 1,
      date: date.toLocaleDateString('en-GB'),
      amount: monthlyAmount.toFixed(2)
    };
  });

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Application Approved!</h1>
          <p className="text-muted-foreground mt-2">
            Your insurance is now active and your payment plan is set up
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What happens next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Confirmation email sent</p>
              <p className="text-sm text-muted-foreground">
                Your agreement and payment schedule have been emailed to {data.customer?.email}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CreditCard className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Direct Debit set up</p>
              <p className="text-sm text-muted-foreground">
                First payment of £{monthlyAmount.toFixed(2)} will be taken on {startDate.toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Insurance active</p>
              <p className="text-sm text-muted-foreground">
                Your coverage with {data.policy?.brokerName} is now active
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Payment Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {paymentSchedule.map((payment) => (
              <div key={payment.payment} className="flex justify-between items-center py-2 border-b border-muted">
                <span className="text-sm">Payment {payment.payment}</span>
                <span className="text-sm text-muted-foreground">{payment.date}</span>
                <span className="font-medium">£{payment.amount}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t">
            <div className="flex justify-between font-medium">
              <span>Total Amount</span>
              <span>£{(monthlyAmount * 10).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Download className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">Download your documents</span>
        </div>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            Download Financing Agreement (PDF)
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            Download Payment Schedule (PDF)
          </Button>
        </div>
      </div>

      <div className="text-center space-y-4">
        <Button onClick={onReturnToBroker} size="lg" className="w-full">
          Return to {data.policy?.brokerName}
        </Button>
        
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Need help? Contact us on 0800 123 4567</p>
          <p>or email support@lendinsure.co.uk</p>
        </div>
      </div>
    </div>
  );
};