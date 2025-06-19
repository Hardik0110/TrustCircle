import { ArrowRight2, Lock1 } from "iconsax-reactjs";
import React, { useState } from "react";

interface StepData {
  id: number;
  title: string;
  image?: string;
  image2?: string;
}

interface StepCardProps {
  step: StepData;
  isExpanded: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const StepCard: React.FC<StepCardProps> = ({ step, isExpanded, isCompleted, onClick }) => {
  const circleColors: string[] = [
    "bg-red-200", "bg-[#FFE1E5]", "bg-green-200", "bg-yellow-200",
    "bg-purple-200", "bg-pink-200", "bg-indigo-200", "bg-teal-200",
    "bg-orange-200", "bg-cyan-200", "bg-lime-200", "bg-rose-200"
  ];

  const getStepBadgeClasses = (): string => {
    if (isCompleted) {
      return "text-sm font-medium px-4 py-1 rounded-full border border-green-300 bg-green-50 text-green-700";
    }
    if (isExpanded) {
      return "text-sm font-medium px-4 py-1 rounded-full border border-orange-300 bg-orange-50 text-gray-800";
    }
    return "text-sm font-medium px-4 py-1 rounded-full bg-[#F0EAE5] text-[#A5A5A5]";
  };

  const getTitleClasses = (): string => {
    return isExpanded || isCompleted ? "text-md font-bold mb-4" : "text-md mb-4 text-[#A5A5A5]";
  };

  const getCardWidth = (): string => {
    return isExpanded ? "w-[340px]" : "w-[168px]";
  };

  const renderStepContent = (): React.ReactNode => {
    if (!isExpanded) return null;

    switch (step.id) {
      case 1:
        return (
          <>
            {step.image && (
              <img
                src={step.image}
                alt={`Step ${step.id} Image`}
                className="absolute bottom-0 right-[10px] w-[140px] h-[140px]"
              />
            )}
            {step.image2 && (
              <img 
                src={step.image2} 
                alt={`Step ${step.id} Secondary Image`}
                className="absolute bottom-0  right-0 w-[115px] h-[126px] object-contain rounded-br-lg"
              />
            )}
          </>
        );
      
      case 2:
        return (
          <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-1">
            {Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className={`w-11 h-11 rounded-full ${circleColors[index]} flex items-center justify-center`}
              >
                <span className="text-white text-md font-bold">+</span>
              </div>
            ))}
          </div>
        );
      
      case 3:
        return (
          <div className="absolute right-6 flex flex-col ">
            <img
              src="src/assets/conversationimage1.png"
              alt={`Step ${step.id} First Image`}
              className="w-[85px] h-[65px] object-cover rounded mb-4 mt-4 mr-2"
            />
            <img
              src="src/assets/conversationimage2.png"
              alt={`Step ${step.id} Second Image`}
              className="w-[90px] h-[65px] object-cover rounded ml-6"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      className={`relative rounded-lg bg-white p-4 h-[218px] flex flex-col shadow-md transition-all duration-300 ease-in-out ${getCardWidth()}`}
    >
      <div className="absolute top-[20px] -right-2 w-4 h-4 rounded-full bg-[#F0EAE5]" />
      <div className="absolute bottom-[20px] -right-2 w-4 h-4 rounded-full bg-[#F0EAE5]" />
      <div className="absolute top-[20px] -left-2 w-4 h-4 rounded-full bg-[#F0EAE5]" />
      <div className="absolute bottom-[20px] -left-2 w-4 h-4 rounded-full bg-[#F0EAE5]" />
      <div className="mb-3">
        <span className={getStepBadgeClasses()}>
          Step {step.id}
        </span>
      </div>
      
      <h6 className={`${getTitleClasses()} break-words whitespace-normal leading-tight max-w-[132px] text-[14px]`}>
        {step.title}
      </h6>
      


      {isExpanded ? (
        <>
          <div className="mt-auto">
            <button className="flex items-center text-green-600 font-medium hover:text-green-700 transition-colors duration-200">
              Get Started Now
              <ArrowRight2 size={18} className="ml-1" />
            </button>
          </div>
          {renderStepContent()}
        </>
      ) : (
        <button 
          onClick={onClick}
          className="mx-auto flex w-16 h-16 items-center justify-center rounded-full bg-[#F0EAE5] cursor-pointer hover:bg-gray-200 transition-colors duration-200"
        >
          <Lock1 size={24} className="text-gray-500" />
        </button>
      )}
    </div>
  );
};

const RecommendationSteps: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<number>(1);

  const stepsData: StepData[] = [
    {
      id: 1,
      title: "Add 5 recommendations & Get 5 Invites!",
      image: "src/assets/slantedcard.png",
      image2: "src/assets/slantedcard2.png"
    },
    {
      id: 2,
      title: "Invite 5 trusted folks and grow your trust circle",
    },
    {
      id: 3,
      title: "Looking for someone? Just ask your circle!",
    }
  ];

  const handleStepClick = (stepId: number): void => {
    if (stepId !== expandedStep) {
      setExpandedStep(stepId);
    }
  };

  const isStepCompleted = (stepId: number): boolean => {
    return stepId < expandedStep;
  };

  return (
    <div className="flex items-start gap-6">
      <div className="ml-[20px] mt-[40px]">
        <img 
          src="src/assets/thinking.png" 
          alt="Thinking character" 
          className="w-[72px] h-[56px]" 
        />
        <h5 className="font-bold mt-2 text-[16px]">Hey John! Alex here</h5>
        <p className="text-[#696F67] text-[14px]">
          let's grow your trusted <br /> circle and unlock more.
        </p>
      </div>

      <div className="flex gap-4 flex-1">
        {stepsData.map((step) => (
          <StepCard
            key={step.id}
            step={step}
            isExpanded={expandedStep === step.id}
            isCompleted={isStepCompleted(step.id)}
            onClick={() => handleStepClick(step.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSteps;