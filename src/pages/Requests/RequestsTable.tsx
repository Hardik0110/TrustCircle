import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { Note1 } from "iconsax-reactjs";

import jsonData from "@/lib/data/requestsData.json";
import AddRecommendation from "@/components/AddRecommendation";

const COLORS = [
  "bg-red-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-indigo-200",
] as const;

const getColorClass = (index: number): string => COLORS[index % COLORS.length];

interface Recommendation {
  name: string;
  initials: string;
  phone: string;
}

interface RequestItem {
  from: {
    name: string;
    initials: string;
    avatar: string | null;
    phone: string;
  };
  requestedFor: string;
  expiresIn: string;
  note: string;
  recommendations: Recommendation[];
}

interface RequestTableProps {
  type: "circle" | "created";
}

const RequestTable = ({ type }: RequestTableProps) => {
  const [showAddRecommendation, setShowAddRecommendation] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  const toggleRow = (index: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const closeModal = () => setShowAddRecommendation(false);
  const openModal = () => setShowAddRecommendation(true);

  return (
    <>
      <AddRecommendationModal 
        show={showAddRecommendation} 
        onClose={closeModal} 
        isMobile={isMobile} 
      />
      <DesktopTable 
        type={type}
        data={jsonData}
        expandedRows={expandedRows}
        onToggleRow={toggleRow}
        onRecommend={openModal}
      />
      <MobileTable 
        type={type}
        data={jsonData}
        expandedRows={expandedRows}
        onToggleRow={toggleRow}
        onRecommend={openModal}
      />
    </>
  );
};

interface AddRecommendationModalProps {
  show: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const AddRecommendationModal = ({ show, onClose, isMobile }: AddRecommendationModalProps) => {
  if (!show) return null;

  return (
    <>
      {!isMobile && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      )}
      <div
        className={
          isMobile
            ? "fixed inset-0 z-50 bg-white"
            : "fixed right-0 top-0 h-full w-[720px] z-50 bg-white shadow-2xl"
        }
      >
        <AddRecommendation />
        {isMobile && (
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-50"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>
    </>
  );
};

interface TableProps {
  type: "circle" | "created";
  data: RequestItem[];
  expandedRows: Set<number>;
  onToggleRow: (index: number) => void;
  onRecommend: () => void;
}

const DesktopTable = ({ type, data, expandedRows, onToggleRow, onRecommend }: TableProps) => (
  <div className="hidden lg:block relative w-[998px] border-2 border-white rounded-[20px]">
    <TableHeader type={type} />
    <div className="max-h-[600px] overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
      {data.map((item, i) => (
        <div key={i}>
          <TableRow 
            item={item} 
            index={i} 
            type={type}
            isExpanded={expandedRows.has(i)}
            onToggleRow={onToggleRow}
            onRecommend={onRecommend}
          />
          {type === "created" && expandedRows.has(i) && item.recommendations.length > 0 && (
            <RecommendationCard recommendations={item.recommendations} />
          )}
        </div>
      ))}
    </div>
  </div>
);

const MobileTable = ({ type, data, expandedRows, onToggleRow, onRecommend }: TableProps) => (
  <div className="lg:hidden block">
    {data.map((item, i) => (
      <div key={i}>
        <MobileCard 
          item={item} 
          index={i} 
          type={type}
          isExpanded={expandedRows.has(i)}
          onToggleRow={onToggleRow}
          onRecommend={onRecommend}
        />
        {type === "created" && expandedRows.has(i) && item.recommendations.length > 0 && (
          <div className="mb-4">
            <RecommendationCard recommendations={item.recommendations} />
          </div>
        )}
      </div>
    ))}
  </div>
);

const TableHeader = ({ type }: { type: "circle" | "created" }) => (
  <div className="bg-[#F8F5F0] px-4 py-2 flex items-center text-sm font-medium text-gray-600">
    {type === "circle" && <div className="flex-[3]">From</div>}
    <div className="flex-[3]">Requested For</div>
    <div className="flex-[2]">Expires In</div>
    <div className="flex-[3]">Note</div>
    {type === "circle" && <div className="flex-[2]"></div>}
    {type === "created" && <div className="flex-[3]">Recommendations</div>}
    {type === "created" && <div className="flex-[1]"></div>}
  </div>
);

interface TableRowProps {
  item: RequestItem;
  index: number;
  type: "circle" | "created";
  isExpanded: boolean;
  onToggleRow: (index: number) => void;
  onRecommend: () => void;
}

const TableRow = ({ item, index, type, isExpanded, onToggleRow, onRecommend }: TableRowProps) => (
  <div className="group flex items-center px-4 py-3 border-gray-200 bg-white hover:bg-[#F8F5F0] transition-colors">
    {type === "circle" && (
      <div className="flex-[3] flex items-center gap-3 text-gray-800">
        <Avatar initials={item.from?.initials || "--"} index={index} />
        {item.from?.name || "Unknown"}
      </div>
    )}
    <div className="flex-[3] text-gray-500">
      <div className="border border-gray-300 rounded-full px-3 py-0 text-xs bg-white inline-block max-w-full whitespace-normal break-words">
        {item.requestedFor}
      </div>
    </div>
    <div className="flex-[2] text-gray-700 text-xs">{item.expiresIn}</div>
    <div className="flex-[3] text-gray-700">
      <Note1 size={18} className="text-gray-500" />
    </div>
    {type === "circle" && (
      <div className="flex-[2] flex justify-end">
        <button
          className="px-4 py-2 bg-[#1C6C41] text-white rounded-full text-sm font-semibold"
          onClick={onRecommend}
        >
          Recommend
        </button>
      </div>
    )}
    {type === "created" && (
      <>
        <div className="flex-[3] flex -space-x-2">
          {item.recommendations.map((rec, idx) => (
            <Avatar key={idx} initials={rec.initials} index={idx} size="sm" />
          ))}
        </div>
        <div className="flex-[1] flex justify-center">
          <button onClick={() => onToggleRow(index)}>
            <ChevronDown 
              className={`text-gray-600 w-4 h-4 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          </button>
        </div>
      </>
    )}
  </div>
);

interface MobileCardProps {
  item: RequestItem;
  index: number;
  type: "circle" | "created";
  isExpanded: boolean;
  onToggleRow: (index: number) => void;
  onRecommend: () => void;
}

const MobileCard = ({ item, index, type, isExpanded, onToggleRow, onRecommend }: MobileCardProps) => (
  <div className="bg-white shadow-sm mb-4 border border-gray-200 p-4">
    {type === "circle" ? (
      <CircleMobileCard item={item} index={index} onRecommend={onRecommend} />
    ) : (
      <CreatedMobileCard 
        item={item} 
        index={index} 
        isExpanded={isExpanded} 
        onToggleRow={onToggleRow} 
      />
    )}
  </div>
);

const CircleMobileCard = ({ item, index, onRecommend }: { 
  item: RequestItem; 
  index: number; 
  onRecommend: () => void; 
}) => (
  <>
    <div className="flex items-center mb-2">
      <Avatar 
        initials={item.from?.initials || "--"} 
        index={index} 
        size="lg" 
        className="mr-3" 
      />
      <div className="font-semibold text-gray-800">{item.from?.name || "Unknown"}</div>
    </div>

    <div className="mb-2">
      <div className="text-sm text-gray-600">
        Looking For <span className="font-semibold text-gray-800 border-1 border-gray-300 rounded-full p-2">
          {item.requestedFor}
        </span>
      </div>
    </div>

    <hr className="my-3 border-gray-200" />

    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-600">Expires In {item.expiresIn}</div>
      <button
        className="px-4 py-2 bg-[#1C6C41] text-white rounded-full text-sm font-semibold"
        onClick={onRecommend}
      >
        Recommend
      </button>
    </div>
  </>
);

const CreatedMobileCard = ({ item, index, isExpanded, onToggleRow }: {
  item: RequestItem;
  index: number;
  isExpanded: boolean;
  onToggleRow: (index: number) => void;
}) => (
  <>
    <div className="mb-2">
      <div className="flex justify-between">
        <span className="text-sm text-gray-800 border-1 border-gray-300 rounded-full p-1 px-2">
          {item.requestedFor}
        </span>
        <button 
          className="flex items-center text-sm font-medium text-gray-700"
          onClick={() => onToggleRow(index)}
        >
          <ChevronDown 
            className={`w-6 h-6 ml-1 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`} 
          />
        </button>
      </div>
    </div>
    <div className="mb-2">
      <div className="text-sm text-gray-600">Expires In {item.expiresIn}</div>
    </div>
    <hr className="my-3 border-gray-200" />

    <div className="mt-4">
      <div className="flex mb-2 -space-x-2">
        {item.recommendations.map((rec, idx) => (
          <Avatar key={idx} initials={rec.initials} index={idx} size="sm" />
        ))}
      </div>
    </div>
  </>
);

interface AvatarProps {
  initials: string;
  index: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Avatar = ({ initials, index, size = "md", className = "" }: AvatarProps) => {
  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-8 h-8",
    lg: "w-10 h-10 text-lg"
  };

  return (
    <div
      className={`${getColorClass(index)} ${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-bold uppercase select-none ${className}`}
    >
      {initials}
    </div>
  );
};

const RecommendationCard = ({ recommendations }: { recommendations: Recommendation[] }) => (
  <div className="bg-[#F8F5F0] rounded-lg p-4">
    <div className="text-sm font-medium text-gray-700 mb-3">
      View {recommendations.length} Recommendations for this request
    </div>
    {recommendations.map((rec, idx) => (
      <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-500">Recommended</div>
          <Avatar initials={rec.initials} index={idx} size="sm" />
          <div className="text-sm font-medium text-gray-800">{rec.name}</div>
          <div className="text-xs text-gray-500">Tutor</div>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{rec.phone}</span>
        </div>
      </div>
    ))}
  </div>
);

export default RequestTable;