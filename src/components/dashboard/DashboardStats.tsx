import { Package, Tag, Box, TrendingUp, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function DashboardStats() {
  const stats = [
    {
      title: "Total Products",
      value: "1,247",
      change: "+12%",
      icon: Package,
      color: "from-[#09668D] to-[#1B3764]",
      bgColor: "bg-gradient-to-br from-[#09668D] to-[#1B3764]",
      textColor: "text-white"
    },
    {
      title: "Active Categories",
      value: "3",
      change: "Stable",
      icon: Tag,
      color: "from-[#F16022] to-[#D35127]",
      bgColor: "bg-gradient-to-br from-[#F16022] to-[#D35127]",
      textColor: "text-white"
    },
    {
      title: "Products Updated",
      value: "89",
      change: "+23%",
      icon: TrendingUp,
      color: "from-[#1B3764] to-[#09668D]",
      bgColor: "bg-gradient-to-br from-[#1B3764] to-[#09668D]",
      textColor: "text-white"
    }
  ];

  return (
    <>
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-poppins font-bold text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <IconComponent className={`h-4 w-4 ${stat.textColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-kallisto font-heavy text-[#09668D]">
                {stat.value}
              </div>
              <p className="text-xs font-poppins text-slate-500 mt-1">
                <span className={stat.change.includes('+') ? 'text-green-600' : 'text-slate-500'}>
                  {stat.change}
                </span> from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}