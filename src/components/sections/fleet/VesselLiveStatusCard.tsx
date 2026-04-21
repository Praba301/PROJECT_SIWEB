interface VesselStatusProps {
  name: string;
  tipe: string;
  eta: string;
  efficiency: string;
  engine: string;
}

const VesselLiveStatus: React.FC<VesselStatusProps> = ({ name, tipe, eta, efficiency, engine }) => (
  <div className="p-6 bg-praketrio-card/50 border border-praketrio-border rounded-xl hover:border-praketrio-purple hover:shadow-[0_0_15px_rgba(181,98,255,0.2)] transition-all group">
    <div className="flex justify-between items-center mb-2">
        <div>
            <h3 className="text-lg font-bold text-white group-hover:text-praketrio-purple transition-colors">{name}</h3>
            <p className="text-xs text-praketrio-textMuted">{tipe}</p>
        </div>
        <div className="flex flex-col text-right gap-1 text-xs">
            <p className="text-praketrio-textMuted">ETA: {eta}</p>
            <p className="font-medium text-white">{efficiency}% Efficient</p>
        </div>
    </div>
    <div className="w-full bg-praketrio-border h-3 rounded-full mt-4 overflow-hidden">
        <div className="bg-praketrio-purple h-full shadow-[0_0_10px_#b562ff]" style={{ width: `${efficiency}%` }}></div>
    </div>
    <div className="flex justify-between items-center text-xs mt-3 text-praketrio-textMuted">
        <span>Engine: <span className="font-medium text-white">{engine}% Load</span></span>
        <button className="px-3 py-1.5 rounded-full border border-praketrio-textMuted text-praketrio-textLight hover:border-praketrio-purple hover:text-praketrio-purple transition-all">Details</button>
    </div>
  </div>
);

const VesselLiveStatusCard: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">Live Vessel Status</h2>
            <VesselLiveStatus name="KM Nusantara" tipe="Container Ship" eta="12 Apr 23:30" efficiency="91.2" engine="78.1" />
            <VesselLiveStatus name="KM Bahtera Jaya" tipe="General Cargo" eta="14 Apr 09:15" efficiency="87.5" engine="65.3" />
        </div>
    );
};

export default VesselLiveStatusCard;