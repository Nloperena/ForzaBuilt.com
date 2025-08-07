import { Button } from "../ui/button";
import { HelpCircle, Download, Save, Settings, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import DashboardDocumentation from "../../pages/DashboardDocumentation";

interface DashboardHeaderProps {
  onExport?: () => void;
  onSave?: () => void;
  onHelp?: () => void;
}

export default function DashboardHeader({ onExport, onSave, onHelp }: DashboardHeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Forza Logo/Brand */}
            <div className="w-12 h-12 bg-gradient-to-br from-[#09668D] to-[#1B3764] rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-kallisto font-heavy text-lg">F</span>
            </div>
            
            <div>
              <h1 className="text-2xl font-kallisto font-heavy text-[#09668D]">
                Forza Admin Portal
              </h1>
              <p className="text-sm font-poppins text-slate-600">
                Product Management Dashboard
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Help Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex gap-2 border-[#09668D] text-[#09668D] hover:bg-[#09668D] hover:text-white transition-all duration-200 font-poppins font-bold"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Help</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-kallisto text-[#09668D]">Dashboard Documentation</DialogTitle>
                  <DialogDescription className="font-poppins">
                    Learn how to use the product management dashboard
                  </DialogDescription>
                </DialogHeader>
                <DashboardDocumentation />
              </DialogContent>
            </Dialog>
            
            {/* Export Button */}
            <Button 
              variant="outline" 
              className="flex gap-2 border-[#F16022] text-[#F16022] hover:bg-[#F16022] hover:text-white transition-all duration-200 font-poppins font-bold"
              onClick={onExport}
            >
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </Button>
            
            {/* Save Button */}
            <Button 
              className="flex gap-2 bg-gradient-to-r from-[#F16022] to-[#D35127] hover:from-[#D35127] hover:to-[#F16022] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 font-poppins font-bold"
              onClick={onSave}
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </Button>
            
            {/* User Menu */}
            <Button 
              variant="ghost" 
              size="sm"
              className="text-slate-600 hover:text-[#09668D] hover:bg-[#09668D] hover:text-white transition-all duration-200"
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
