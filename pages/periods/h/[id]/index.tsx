import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { periodType } from "../../../../lib/types/types";
import HourlySelect from "../../../../components/hourly_select";

export default function PeriodHours() {
    const router = useRouter();
    const[isLoading, setIsLoading] = useState(false);
    
    const [period, setPeriod] = useState<periodType>();
    const [periodExists, setPeriodExists] = useState(false);
    const periodId = router.query["id"] as string;
    const [dateStartDate, setDateStartDate] = useState(new Date());
    const [dateEndDate, setDateEndDate] = useState(new Date());
    
    useEffect(() => {
        const fetchPeriod = async () => {
            if (!periodId) {
                console.error("Period ID is undefined");
                return;
            }

            setIsLoading(true);
            try {
                const periodResponse = await fetch(`/api/periods/${periodId}`);
                const periodData = await periodResponse.json();
                if (periodResponse.ok) {
                    setPeriod(periodData.period);
                    setPeriodExists(periodData.exists);
                    setDateStartDate(periodData.period.timePeriod.start);
                    setDateEndDate(periodData.period.timePeriod.end);
                    console.log("Period data:", periodData);
                } else {
                    throw new Error(periodData.error || "Unknown error");
                }
            } catch (error) {
                console.error("Error checking period:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPeriod();
    }, [periodId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col">
            <div className="text-center justify-center flex flex-col">
                <h1 className="my-5 text-5xl font-semibold text-center">{period?.name}</h1>
                <h2 className="text-2xl text-center">{period?.description}</h2>
            </div>
            <HourlySelect startDate={dateStartDate} endDate={dateEndDate}/>
        </div>
    );
    

};