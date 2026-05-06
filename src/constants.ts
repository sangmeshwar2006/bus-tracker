export const MOCK_BUSES = [
  { id: '1', route: 'B-1', destination: 'Bidar Fort', eta: '5m', status: 'Live • On Time', type: 'KSRTC', plate: 'KA-38-F-4321', color: 'red', position: { lat: 17.9143, lng: 77.5042 }, top: '40%', left: '35%' },
  { id: '2', route: '102', destination: 'Guru Nanak Gate', eta: '10m', status: 'Delayed 3m', type: 'CITY', plate: 'KA-38-F-5678', color: 'blue', position: { lat: 17.9250, lng: 77.5150 }, top: '55%', right: '30%' },
];

export const RECENT_SEARCHES = [
  { route: 'KA-38-F-4321', path: 'Bus Stand to Bidar Fort', icon: 'history', color: 'primary' },
  { route: 'Bidar Depo', path: 'Central Terminal', icon: 'directions_bus', color: 'surface-variant' },
  { route: 'Basavakalyan', path: 'Express Route', icon: 'near_me', color: 'surface-variant' },
  { route: 'Humnabad', path: 'Intercity', icon: 'work', color: 'surface-variant' },
];

export const NEARBY_ROUTES = [
  { id: 'B1', route: 'B-1', from: 'Central Bus Stand', to: 'Bidar Fort', live: '2 buses live', frequency: 'Every 15 mins', next: '5 min', color: 'primary' },
  { id: 'K1', route: '102', from: 'Bidar Depo', to: 'Guru Nanak Jhira', live: '1 bus live', frequency: 'Every 20 mins', next: '10 min', color: 'secondary', type: 'City Service' },
  { id: 'HK1', route: 'EX-99', from: 'Bidar', to: 'Kalaburagi', live: '1 bus live', frequency: 'Hourly', next: '14:30', color: 'surface-variant', type: 'Express' },
];

export const STOP_ARRIVALS = [
  { id: 'B1', destination: 'Bidar Fort', distance: '1.2 km away', traffic: 'Light Traffic', eta: '5', etaUnit: 'mins', color: 'primary' },
  { id: '102', destination: 'Guru Nanak Jhira', distance: '3.4 km away', traffic: 'Medium Traffic', eta: '10', etaUnit: 'mins', color: 'surface-container-highest' },
  { id: 'EX99', destination: 'Kalaburagi', distance: '8.5 km away', traffic: 'Normal Traffic', eta: '25', etaUnit: 'mins', color: 'surface-container-highest' },
];

export const IMAGES = {
  mapPreview: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9DtlHK8NY_AyEWAs4Yfw_t8hIE-cnbabT2N8sGxvwvxqGgw2sK8Sg2SZ4usQIsGhoXGyWf7R7661N-KkP8LSvSgPOxp3rZ9-KfHRhsiWDDREkaisB4JNQS1SCbQmU5uN4A-9CczJwPzRNwcPuyL1TtddCKq288sFASlByqMwMaoNpLxuzTRzu8PZu_nQyxXKgxaTu8uyP79_2lvBUSAXRYjta69NVHzHXXKDjoMAftrEkGE2Z6wrgKpk-Fvpef8jSyIbjrOvTs8U",
  trackingMap: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZjIhrZzm1HC-4dGnmkDX_Ce0DgE-hzrbVCxHZ9D_hESTyFZv0OZW8k8YK_UI6zXprn7HgdwHgjL7yTFX_c4_CZJwX0SMAXFknlexMnA8Oy5aP4fesFonTqvCIkmEHocIS0DmhTNwS1RsO_wbdn2TguVZRAVA_bRpiWTycd7NDebPSVW8u8c1UPNx5jVBGHHWBsnbx4HEsEYM9RjgW5dbsJtuE5JBO-aOAaUyd7nN4_QoGyW09o_s4GtWIEh3NsJMJ5iw5WGctJO0",
  stopMap: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcGfRdv2W2xAr6EmFe67i-BJwUJTbibpSfWRWgX17bygRoVHFOnFM3bY3DcUo5uhheXfetnu0mLpHoYkUSI3Zy9aDnk5T2FmKJ6UfStBkUVsi53yx93MAIjeq7LrnAsOGYcYaho-4Yh2WUrf8iYdxGhlIDsEQIotRFASY9_x67Zk7a3CrqjoYvwXofkFECihF77thKMVl-_5Lv_JhYajEZjJezOGdNm6MIdlHgeyLnRHV29rt9sg-rP4kukvnMCn0Li3OUDA-SA_s",
  welcomeBus: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8MbPeV9P0iUOExTRlZLsUz51bt2yxtW2sTjqW45efvIMZ0qdBbhVfm7WbdUq4nXBdr--moqcJqU2j3uYYDmD8XAYkZG26BnPLOFhkB_kj8O0AjMedvpqcIGRtPWygPpk9G4xDgjK2bq67-WwBjF0_ZxC12QeRXZhEgm4PDg044dQmMCd-wtQO-2RU6XeHbVr4ehAnMl_gWV2M_5Lt3u2gAAHCd9Izdunf99dgHIr9pGp8c4qR3uMi2rnnCOtdT3UnNP458g7CUjw",
  backdropMap: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlLJG5PNzv1guZfWJ3dsdHvFs2yJTQQafNACFVJ_4wxrF2Qg7Vapbjtkf3sFGMipRPTXwW4WAUImr1HBhsiYgMHFyWeSHUpD5veOJ-IIiSycfW2OzLP-RTA4b3zh5IOKYG_ACPfq90iSQbdg65vwP52STxEMHSa-YOjQhsdFuIUbwdFTECswl-bXwoEB92SFXJHELN8ZHbKEKl8iZD_P2EU5loW95DJZymVYFmEoo9nGUD3dX1JKR8idW9aehO2DNXeHAqgK0aiI0",
};
