export interface createTimes {
  start_time: string;
  end_time: string;
  interval: boolean;
  start_time_interval: string;
  end_time_interval: string;
  dayWeek: string;
  restaurant_id: string | undefined;
}

export interface updateTimes {
  start_time?: string;
  end_time?: string;
  interval?: boolean;
  start_time_interval?: string;
  end_time_interval?: string;
  dayWeek?: string;
  restaurant_id?: string;
}

export interface getTimes {
  start_time: string;
  end_time: string;
  interval: boolean;
  start_time_interval?: string;
  end_time_interval?: string;
  dayWeek: string;
  restaurant: restautant;
}
export interface restautant {
  id: string;
  name: string;
}
