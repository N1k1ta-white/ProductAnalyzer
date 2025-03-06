import { Card } from "@/components/ui/card.tsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import {DatePicker} from "@/pages/profile/dashboard/DatePicker.tsx";
import {TotalRevenueChart} from "@/pages/profile/dashboard/TotalRevenueChart.tsx";
import {RevenueByCategoryChart} from "@/pages/profile/dashboard/RevenueByCategoryChart.tsx";
import {CircleChart} from "@/pages/profile/dashboard/CircleChart.tsx";
import {CountriesChart} from "@/pages/profile/dashboard/CountriesChart.tsx";

const recentSales = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "$1,999.00" },
    { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "$39.00" },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "$299.00" },
    { name: "William Kim", email: "will@email.com", amount: "$99.00" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "$39.00" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "$39.00" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "$39.00" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "$39.00" }
];

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <DatePicker/>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Card className="p-4">
                    <p className="text-sm">Total Revenue</p>
                    <h2 className="text-xl font-bold">$45,231.89</h2>
                    <p className="text-xs text-green-600">+20.1% from last month</p>
                </Card>
                <Card className="p-4">
                    <p className="text-sm">Subscriptions</p>
                    <h2 className="text-xl font-bold">+2,350</h2>
                    <p className="text-xs text-green-600">+180.1% from last month</p>
                </Card>
                <Card className="p-4">
                    <p className="text-sm">Sales</p>
                    <h2 className="text-xl font-bold">+12,234</h2>
                    <p className="text-xs text-green-600">+19% from last month</p>
                </Card>
            </div>
            <div className="flex flex-1 lg:flex-row flex-col gap-4 w-full">
                <TotalRevenueChart className="lg:w-[50%] w-full p-4"/>
                <RevenueByCategoryChart className="lg:w-[50%] w-full p-4"/>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 w-full pb-6 justify-center">
                <CountriesChart />
                <Card className="flex flex-col gap-4 p-6 h-fit">
                    <h2 className="text-lg font-semibold">Recent Sales</h2>
                    <div className="flex flex-col gap-4 flex-1 max-h-[22rem] overflow-y-auto custom-scroll pr-6">
                        {recentSales.map((sale, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{sale.name}</p>
                                        <p className="text-xs text-gray-500">{sale.email}</p>
                                    </div>
                                </div>
                                <p className="font-semibold">{sale.amount}</p>
                            </div>
                        ))}
                    </div>
                </Card>
                <CircleChart/>
            </div>
        </div>
    );
}
