import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, ArrowLeft, Phone, Mail } from "lucide-react";

interface DeclinePageProps {
  onReturnToBroker: () => void;
}

export const DeclinePage = ({ onReturnToBroker }: DeclinePageProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
          <XCircle className="h-8 w-8 text-destructive" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Application Not Approved</h1>
          <p className="text-muted-foreground mt-2">
            We're unable to approve your monthly payment plan at this time
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What this means</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Based on our affordability assessment, we cannot offer you a monthly payment plan for this insurance policy. 
            This decision helps protect you from taking on credit that may not be suitable for your current financial situation.
          </p>
          
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Your options:</h3>
            <ul className="text-sm space-y-1">
              <li>• Return to your insurance provider to pay the premium in full</li>
              <li>• Contact your insurer about alternative payment options</li>
              <li>• Consider applying for a different insurance policy with a lower premium</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Important:</strong> This decision does not affect your credit file. 
              We performed a soft credit check which is only visible to you.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Need more information?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Call our team</p>
                <p className="text-sm text-muted-foreground">0800 123 4567 (Mon-Fri, 9am-5pm)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Email support</p>
                <p className="text-sm text-muted-foreground">support@lendinsure.co.uk</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <Button onClick={onReturnToBroker} size="lg" className="w-full">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to Insurance Provider
        </Button>
        
        <p className="text-sm text-muted-foreground">
          You'll be redirected back to complete your insurance purchase
        </p>
      </div>
    </div>
  );
};