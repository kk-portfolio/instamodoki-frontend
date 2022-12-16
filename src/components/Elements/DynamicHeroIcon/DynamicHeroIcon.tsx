import * as HIcons from '@heroicons/react/outline';

type DynamicHeroIconProps = {
  icon: string;
  className?: string;
};

export const DynamicHeroIcon = ({
  icon,
  className = 'h-6 w-6 text-white',
}: DynamicHeroIconProps) => {
  const { ...icons } = HIcons;
  // @ts-ignore
  const TheIcon: JSX.Element = icons[icon];

  return (
    <>
      {/* @ts-ignore */}
      <TheIcon className={className} aria-hidden="true" />
    </>
  );
};
