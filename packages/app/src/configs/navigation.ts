type INavigation = {
  label: string;
  url: string;
  disabled: boolean;
};

export const NavigationData: INavigation[] = [
  {
    label: 'Home',
    url: '/',
    disabled: false,
  },
  {
    label: 'Flex Gallery',
    url: '/gallery',
    disabled: false,
  },

  {
    label: 'Verify',
    url: '/proof',
    disabled: false,
  },
];
