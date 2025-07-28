import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { OnboardingData } from "../OnboardingWizard";
import { ChevronLeft } from "lucide-react";

interface CustomerDetailsFormProps {
  data: Partial<OnboardingData>;
  onNext: () => void;
  onPrev: () => void;
  onUpdateData: (data: Partial<OnboardingData>) => void;
}

export const CustomerDetailsForm = ({ data, onNext, onPrev, onUpdateData }: CustomerDetailsFormProps) => {
  const [formData, setFormData] = useState({
    fullName: data.customer?.fullName || "",
    dateOfBirth: data.customer?.dateOfBirth || "",
    email: data.customer?.email || "",
    phone: data.customer?.phone || "",
    address: {
      line1: data.customer?.address?.line1 || "",
      line2: data.customer?.address?.line2 || "",
      city: data.customer?.address?.city || "",
      postcode: data.customer?.address?.postcode || "",
    },
    gdprConsent: data.customer?.gdprConsent || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.line1.trim()) newErrors.addressLine1 = "Address line 1 is required";
    if (!formData.address.city.trim()) newErrors.city = "City is required";
    if (!formData.address.postcode.trim()) newErrors.postcode = "Postcode is required";
    if (!formData.gdprConsent) newErrors.gdprConsent = "You must agree to continue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdateData({ customer: formData });
      onNext();
    }
  };

  const updateField = (field: string, value: string | boolean) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onPrev}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Your Details</h1>
          <p className="text-muted-foreground">We need some information to process your application</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className={errors.fullName ? "border-destructive" : ""}
                />
                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateField("dateOfBirth", e.target.value)}
                  className={errors.dateOfBirth ? "border-destructive" : ""}
                />
                {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">UK Address</h3>
              
              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1 *</Label>
                <Input
                  id="addressLine1"
                  value={formData.address.line1}
                  onChange={(e) => updateField("address.line1", e.target.value)}
                  className={errors.addressLine1 ? "border-destructive" : ""}
                />
                {errors.addressLine1 && <p className="text-sm text-destructive">{errors.addressLine1}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  value={formData.address.line2}
                  onChange={(e) => updateField("address.line2", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.address.city}
                    onChange={(e) => updateField("address.city", e.target.value)}
                    className={errors.city ? "border-destructive" : ""}
                  />
                  {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postcode">Postcode *</Label>
                  <Input
                    id="postcode"
                    value={formData.address.postcode}
                    onChange={(e) => updateField("address.postcode", e.target.value)}
                    className={errors.postcode ? "border-destructive" : ""}
                  />
                  {errors.postcode && <p className="text-sm text-destructive">{errors.postcode}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="gdprConsent"
                  checked={formData.gdprConsent}
                  onCheckedChange={(checked) => updateField("gdprConsent", checked as boolean)}
                />
                <div className="space-y-1">
                  <Label htmlFor="gdprConsent" className="text-sm leading-5">
                    I agree to Lendinsure processing my personal data for credit assessment and 
                    to receive updates about my application via email and SMS.
                  </Label>
                  {errors.gdprConsent && <p className="text-sm text-destructive">{errors.gdprConsent}</p>}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Continue to Bank Connection
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};