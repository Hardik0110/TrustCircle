import { UserSearch, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecommendationBar = () => {
    const navigate = useNavigate();
return (
  <div
    className="rounded-lg px-4 py-4 flex items-center justify-between mb-0 mt-5"
    style={{
      background: 'linear-gradient(to right, white 0%, white 3%, #E9FF95 10%, #E9FF95 100%)'
    }}
  >
    <div className="flex items-center gap-3">
      <UserSearch size={20} className="text-green-700" />
      <span className="text-green-900 text-sm">
        <span className='text-black font-bold'>John Smith </span> is looking for <strong className='font-bold text-black'>Electrician</strong>. Help him to get trusted recommendation
      </span>
    </div>
    <button 
    className="text-green-900 font-medium text-sm flex items-center gap-1"
    onClick={() => navigate('/requests')}>
      Suggest Recommendation
      <ArrowRight size={16} />
    </button>
  </div>
  )
};

export default RecommendationBar;
