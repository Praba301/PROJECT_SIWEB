const KpiCard: React.FC<{ label: string; value: string; trend: string; isNegative?: boolean }> = ({ label, value, trend, isNegative }) => (
    <div className="p-6 bg-praketrio-card/50 border border-praketrio-border rounded-xl">
        <p className="text-xs text-praketrio-textMuted mb-2">{label}</p>
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className={`text-[10px] ${isNegative ? 'text-red-400' : 'text-green-400'}`}>
            {trend} <span className="text-praketrio-textMuted">vs last week</span>
        </p>
    </div>
);

const FleetKpiOverview: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">Fleet KPI Overview</h2>
            <div className="grid grid-cols-2 gap-4">
                <KpiCard label="Average Efficiency" value="89.3%" trend="+1.2%" />
                <KpiCard label="Fuel Consumed" value="124.7 KL" trend="-0.8%" />
                <KpiCard label="On-Time Departure" value="96.1%" trend="+2.5%" />
                <KpiCard label="Maintenance Score" value="94.2/100" trend="-1.5%" isNegative />
            </div>
        </div>
    );
};

export default FleetKpiOverview;