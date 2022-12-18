import { formatDistance, format, ja } from 'date-fns';

export const formatDateDistance = (date: Date): string => {
  const distance = formatDistance(new Date(), date, {
    locale: ja,
  });
  if (distance.indexOf('未満') !== -1) {
    return 'たった今';
  }
  if (distance.indexOf('か月') !== -1 || distance.indexOf('年') !== -1) {
    return format(date, 'yyyy年M月d日', {
      locale: ja,
    });
  }
  return distance + '前';
};
