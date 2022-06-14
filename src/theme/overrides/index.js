import MobileStepper from "./MobileStepper";
import Tab from './Tab';
import Tabs from './Tabs'
import PaginationItem from './PaginationItem';
import Skeleton from './Skeleton';

export default function ComponentsOverrides(theme) {
  return Object.assign(
    PaginationItem(theme),
    MobileStepper(theme),
    Tab(theme),
    Tabs(theme),
    Skeleton(theme)
  );
};