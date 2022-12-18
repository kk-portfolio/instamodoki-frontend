import { DynamicHeroIcon } from '@/components/Elements/DynamicHeroIcon';

type IconButtonProps = {
  heroIconName: string;
  onClick?: () => void;
};

export const IconButton = ({ heroIconName, onClick = () => {} }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white rounded-md w-8 h-8  hover:opacity-80 flex justify-center items-center"
    >
      <DynamicHeroIcon icon={heroIconName} />
    </button>
  );
};
