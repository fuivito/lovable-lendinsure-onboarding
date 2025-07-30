import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Users, Building2 } from "lucide-react";
import { AddCustomerModal } from "@/components/broker/AddCustomerModal";

export type CustomerType = "Business" | "Consumer";
export type ApplicationStatus = "In Progress" | "Approved" | "Declined";

export interface CustomerApplication {
  id: string;
  name: string;
  type: CustomerType;
  status: ApplicationStatus;
  loanAmount: number;
  instalmentPlan: string;
  apr: number;
  createdAt: Date;
}

const BrokerPortal = () => {
  const [filterType, setFilterType] = useState<CustomerType | "All">("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [applications, setApplications] = useState<CustomerApplication[]>([
    {
      id: "1",
      name: "John Smith",
      type: "Consumer",
      status: "Approved",
      loanAmount: 1200,
      instalmentPlan: "12 months",
      apr: 4.5,
      createdAt: new Date("2024-01-15")
    },
    {
      id: "2", 
      name: "Tech Solutions Ltd",
      type: "Business",
      status: "In Progress",
      loanAmount: 5000,
      instalmentPlan: "24 months",
      apr: 6.2,
      createdAt: new Date("2024-01-20")
    },
    {
      id: "3",
      name: "Sarah Johnson",
      type: "Consumer", 
      status: "Declined",
      loanAmount: 800,
      instalmentPlan: "6 months",
      apr: 3.8,
      createdAt: new Date("2024-01-22")
    }
  ]);

  const filteredApplications = applications.filter(app => 
    filterType === "All" || app.type === filterType
  );

  const getStatusBadgeVariant = (status: ApplicationStatus) => {
    switch (status) {
      case "Approved": return "default";
      case "In Progress": return "secondary";
      case "Declined": return "destructive";
    }
  };

  const handleAddCustomer = (customerData: {
    type: CustomerType;
    premiumAmount: number;
    apr: number;
  }) => {
    // This would normally integrate with the onboarding wizard
    console.log("Starting financing flow for:", customerData);
    setIsAddModalOpen(false);
    // You can add logic here to redirect to onboarding with pre-filled data
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Broker Portal</h1>
            <p className="text-muted-foreground">Manage customer applications and financing flows</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add New Customer
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications.filter(app => app.status === "Approved").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {((applications.filter(app => app.status === "Approved").length / applications.length) * 100).toFixed(0)}% approval rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Loan Value</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                £{applications.reduce((sum, app) => sum + app.loanAmount, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Active loans</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={filterType} onValueChange={(value) => setFilterType(value as CustomerType | "All")}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Customers</SelectItem>
              <SelectItem value="Consumer">Consumer</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Loan Amount</TableHead>
                  <TableHead>Instalment Plan</TableHead>
                  <TableHead>APR</TableHead>
                  <TableHead>Date Applied</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {application.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(application.status)}>
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell>£{application.loanAmount.toLocaleString()}</TableCell>
                    <TableCell>{application.instalmentPlan}</TableCell>
                    <TableCell>{application.apr}%</TableCell>
                    <TableCell>{application.createdAt.toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <AddCustomerModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onSubmit={handleAddCustomer}
        />
      </div>
    </div>
  );
};

export default BrokerPortal;