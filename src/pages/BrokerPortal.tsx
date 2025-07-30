import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Users, Building2, Search } from "lucide-react";
import { AddCustomerModal } from "@/components/broker/AddCustomerModal";
import { useNavigate } from "react-router-dom";

export type CustomerType = "Business" | "Consumer";
export type ApplicationStatus = "In Progress" | "Approved" | "Declined" | "Pending";

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
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<CustomerType | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [applications, setApplications] = useState<CustomerApplication[]>([
    {
      id: "1",
      name: "John Smith",
      type: "Consumer",
      status: "Approved",
      loanAmount: 1200,
      instalmentPlan: "£100 x 12",
      apr: 4.5,
      createdAt: new Date("2024-01-15")
    },
    {
      id: "2", 
      name: "Tech Solutions Ltd",
      type: "Business",
      status: "In Progress",
      loanAmount: 5000,
      instalmentPlan: "£208 x 24",
      apr: 6.2,
      createdAt: new Date("2024-01-20")
    },
    {
      id: "3",
      name: "Sarah Johnson",
      type: "Consumer", 
      status: "Declined",
      loanAmount: 800,
      instalmentPlan: "£133 x 6",
      apr: 3.8,
      createdAt: new Date("2024-01-22")
    },
    {
      id: "4",
      name: "Manchester Motors Ltd",
      type: "Business",
      status: "Pending",
      loanAmount: 3500,
      instalmentPlan: "£292 x 12",
      apr: 5.5,
      createdAt: new Date("2024-01-25")
    }
  ]);

  const filteredApplications = applications.filter(app => {
    const matchesType = filterType === "All" || app.type === filterType;
    const matchesSearch = searchTerm === "" || 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.status.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusBadgeVariant = (status: ApplicationStatus) => {
    switch (status) {
      case "Approved": return "default";
      case "In Progress": return "secondary";
      case "Declined": return "destructive";
      case "Pending": return "outline";
      default: return "outline";
    }
  };

  const handleAddCustomer = (customerData: {
    type: CustomerType;
    premiumAmount: number;
    apr: number;
  }) => {
    // Navigate to onboarding flow with pre-filled data
    const params = new URLSearchParams({
      type: customerData.type,
      premium: customerData.premiumAmount.toString(),
      apr: customerData.apr.toString(),
      broker: "Your Insurance Broker"
    });
    
    navigate(`/onboarding?${params.toString()}`);
    setIsAddModalOpen(false);
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

        {/* Filters and Search */}
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
          
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Applications ({filteredApplications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer hover:bg-muted/50">Customer Name</TableHead>
                    <TableHead className="cursor-pointer hover:bg-muted/50">Type</TableHead>
                    <TableHead className="cursor-pointer hover:bg-muted/50">Premium Amount</TableHead>
                    <TableHead className="cursor-pointer hover:bg-muted/50">Instalment Terms</TableHead>
                    <TableHead className="cursor-pointer hover:bg-muted/50">APR</TableHead>
                    <TableHead className="cursor-pointer hover:bg-muted/50">Status</TableHead>
                    <TableHead className="cursor-pointer hover:bg-muted/50">Date Applied</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{application.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {application.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">£{application.loanAmount.toLocaleString()}</TableCell>
                      <TableCell>{application.instalmentPlan}</TableCell>
                      <TableCell>{application.apr}%</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(application.status)}>
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{application.createdAt.toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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